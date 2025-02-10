import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphData, KnowledgeNode } from './types';
import { FiMaximize, FiMinimize } from 'react-icons/fi';

interface KnowledgeGraphProps {
  data: GraphData;
  width: number;
  height: number;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    // 清除现有内容
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const g = svg.append("g");

    // 添加缩放功能
    const zoom = d3.zoom()
      .scaleExtent([0.3, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // 创建力导向图布局
    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(data.edges)
        .id((d: d3.SimulationNodeDatum) => (d as any).id)
        .distance(150))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // 定义箭头标记
    svg.append("defs").selectAll("marker")
      .data(["Prerequisite", "Includes", "AppliedIn", "AdvancesTo"])
      .enter().append("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 28)  // 调整箭头位置，使其不覆盖节点
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", d => getEdgeColor(d));

    // 绘制边
    const edges = g.selectAll(".edge")
      .data(data.edges)
      .enter()
      .append("g")
      .attr("class", "edge")
      .style("cursor", "default");

    // 添加边的线条
    edges.append("line")
      .style("stroke", (d: any) => getEdgeColor(d.relationship))
      .style("stroke-width", 2)
      .style("stroke-opacity", 0.6)
      .style("stroke-dasharray", (d: any) => getEdgeStyle(d.relationship))
      .attr("marker-end", (d: any) => isDirectedEdge(d.relationship) ? 
        `url(#arrow-${d.relationship})` : "");

    // 绘制节点
    const nodes = g.selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "default")
      .call(d3.drag<any, any>()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

    // 添加节点圆形
    nodes.append("circle")
      .attr("r", 20)
      .style("fill", (d: KnowledgeNode) => getColorByCategory(d.category));

    // 添加节点文本
    nodes.append("text")
      .text((d: KnowledgeNode) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 30);

    // 更新力导向图
    simulation.on("tick", () => {
      edges.selectAll("line")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // 拖拽相关函数
    function dragStarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // 初始缩放以适应屏幕
    const bounds = (g.node() as SVGGElement).getBBox();
    const scale = Math.min(
      0.85,  // 最大缩放比例
      0.85 / Math.max(bounds.width / width, bounds.height / height)  // 根据内容自动计算缩放
    );
    const transform = d3.zoomIdentity
      .translate(
        width / 2 - (bounds.x + bounds.width / 2) * scale,
        height / 2 - (bounds.y + bounds.height / 2) * scale
      )
      .scale(scale);
    
    svg.call(zoom.transform as any, transform);

  }, [data, width, height]);

  const toggleFullscreen = () => {
    const element = document.querySelector('.knowledge-graph');
    if (!element) return;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="knowledge-graph bg-white rounded-lg shadow p-4 relative">
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10"
        title={isFullscreen ? "退出全屏" : "全屏显示"}
      >
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </button>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="cursor-move"
      />
      <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-sm">
        提示：可拖拽移动，滚轮缩放
      </div>
    </div>
  );
};

// 根据知识点类别返回不同颜色
function getColorByCategory(category: string): string {
  const colorMap = {
    '函数': '#FF6B6B',
    '几何': '#4ECDC4',
    '代数': '#45B7D1',
    '概率统计': '#96CEB4'
  };
  return colorMap[category as keyof typeof colorMap] || '#666';
}

// 添加辅助函数
function getEdgeColor(relationship: string): string {
  const colorMap: Record<string, string> = {
    'Prerequisite': '#2D3748',
    'Includes': '#4A5568',
    'RelatedTo': '#718096',
    'AppliedIn': '#A0AEC0',
    'AdvancesTo': '#CBD5E0'
  };
  return colorMap[relationship] || '#999';
}

function getEdgeStyle(relationship: string): string {
  const styleMap: Record<string, string> = {
    'Includes': '5,5',
    'RelatedTo': '2,2',
    'default': ''
  };
  return styleMap[relationship] || styleMap.default;
}

function isDirectedEdge(relationship: string): boolean {
  const directedTypes = [
    'Prerequisite',
    'Includes',
    'AppliedIn',
    'AdvancesTo'
  ];
  return directedTypes.includes(relationship);
}

export default KnowledgeGraph; 