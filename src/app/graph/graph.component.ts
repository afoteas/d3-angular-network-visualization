import {Component, ElementRef, Input, NgModule, OnInit, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {miserables} from './data';
import * as d3 from 'd3';
import {NodeLocation} from './NodeLocationInterface';
import { NodeImages } from './NodeImages';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit, OnDestroy {
  name: string;
  svg;
  gMain;
  height;
  width;
  rect;
  gDraw;
  zoom;
  color;
  simulation;
  link;
  node;
  id = '111';

  nodeId: Array<string> = [];
  xNodes: any[] = [];
  xxx = {};
  yNodes: any[] = [];
  yyy = {};

  private tooltip1: any;
  private tooltip2: any;
  private tooltip3: any;
  private tooltip4: any;
  private tooltip6: any;
  private tooltip7: any;
  private tooltip8: any;

  @Input()

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() { }

  ngOnInit() {
  }

  onResize() {
    console.log('onResize');
  }

  ngAfterViewInit() {
    this.svg = d3.select('svg');

    const width = +this.svg.attr('width');
    const height = +this.svg.attr('height');

    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    function dist() {
      return this.link.value + 20;
    }

    this.simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => 60))
      .force('x', d3.forceX(width))
      .force('y', d3.forceY(height));

    this.gMain = this.svg.append('g')
      .classed('g-main', true);

    this.gDraw = this.gMain.append('g');
    this.rect = this.gDraw.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'snow');

    this.render(miserables);
  }

  ticked() {
    const t = this;
    let xw: any = '';
    let yw: any = '';
    let xw1: any = '';
    let yw1: any = '';

    this.node
      .attr('cx', d => {
        t.xxx = {id: d.id, x: d.x};
        t.xNodes.push(t.xxx);
        return d.x; })
      .attr('cy', d => {
        t.yyy = {id: d.id, y: d.y};
        t.yNodes.push(t.yyy);
        return d.y; })
      .attr('x', d => {
         return d.x; })
      .attr('y', d => {
        return d.y; });

    this.link
      .attr('x1', d => {
        const source = d.source;
        for (let index = 0; index < t.xNodes.length; index++) {
          if (source === t.xNodes[index].id) {
            xw = t.xNodes[index].x;
            t.xNodes.splice(index, 1);
            break;
          }
        }
        console.log(xw);
        return xw; })

      .attr('y1', d => {
        const source = d.source;
        for (let index = 0; index < t.yNodes.length; index++) {
          if (source === t.yNodes[index].id) {
            yw = t.yNodes[index].y;
            t.yNodes.splice(index, 1);
            break;
          }
        }
        return yw; })

      .attr('x2', d => {
        const target = d.target;
        for (let index = 0; index < t.xNodes.length; index++) {
          if (target === t.xNodes[index].id) {
            xw1 = t.xNodes[index].x;
            t.xNodes.splice(index, 1);
            break;
          }
        }
        return xw1; })

      .attr('y2', d => {
        const target = d.target;
        for (let index = 0; index < t.yNodes.length; index++) {
          if (target === t.yNodes[index].id) {
            yw1 = t.yNodes[index].y;
            t.yNodes.splice(index, 1);
            break;
          }
        }
        return yw1; });

    this.node
    .on('mouseover',
      (d) => {
        const [posX, posY] = [d3.event.x, d3.event.y];

        this.tooltip1 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');


        this.tooltip1
          .attr('x', posX + 10)
          .attr('y', posY - 105)
          .text('Node ID: ' + d.id);

        this.tooltip2 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');

        this.tooltip2
          .attr('x', posX + 10)
          .attr('y', posY - 90)
          .text('Status: ' + d.status);

        this.tooltip3 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');

        this.tooltip3
          .attr('x', posX + 10)
          .attr('y', posY - 75)
          .text('Location: ' + d.location);

        this.tooltip4 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');
        this.tooltip4
          .attr('x', posX + 10)
          .attr('y', posY - 60)
          .text('Model : ' + d.model);


      }).on('mouseout', () => {
          this.tooltip1.style('visibility', 'hidden');
          this.tooltip2.style('visibility', 'hidden');
          this.tooltip3.style('visibility', 'hidden');
          this.tooltip4.style('visibility', 'hidden');

      }).on('mousemove', (d: any) => {
        d3.select('.chart-tooltip1')
        .style('left', d3.event.pageX + 15 + 'px')
        .style('top', d3.event.pageY - 25 + 'px')
        .text(d[1] - d[0]);
      });

    this.link.on('mouseover',
      (d) => {
        const [posX, posY] = [d3.event.x, d3.event.y];

        this.tooltip6 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');


        this.tooltip6
          .attr('x', posX + 10)
          .attr('y', posY - 95)
          .text('Status: ' + d.status );

        this.tooltip7 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');

        this.tooltip7
          .attr('x', posX + 10)
          .attr('y', posY - 80)
          .text( 'Type: ' + d.type );

        this.tooltip8 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'Grey');

        this.tooltip8
          .attr('x', posX + 10)
          .attr('y', posY - 65)
          .text( 'Speed: ' + d.speed + 'Mbps' );
        }).on('mouseout', () => {
          this.tooltip6.style('visibility', 'hidden');
          this.tooltip7.style('visibility', 'hidden');
          this.tooltip8.style('visibility', 'hidden');
        }).on('mousemove', (d: any) => {
        d3.select('.chart-tooltip1')
          .style('left', d3.event.pageX + 15 + 'px')
          .style('top', d3.event.pageY - 25 + 'px')
          .text(d[1] - d[0]);
        });

  }

  render(graph) {
    // this.simulation.force("link", d3.forceLink(graph.links));
    console.log('render');

    this.link = this.gDraw.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.value))
      .attr('stroke', (d) => 'Grey');

    this.node = this.gDraw.append('g')
      .attr('class', 'nodes')
      .selectAll()
      .data(graph.nodes)
      .enter()
      .append('svg')
      .attr('width', '40')
      .attr('height', '40')
      .attr('viewBox', '0 0 40 40')
      .attr('overflow', 'visible')
      .html((d) => {
        if (d.type === 'router') {
          if (d.status === 'up') {
            return this.networkElementImage('-20', '-20', 'router-green.png');
          } else {
            return this.networkElementImage('-20', '-20', 'router-red.png');
          }
        } else if (d.type === 'switch') {
          if (d.status === 'up') {
            return this.networkElementImage('-20', '-20', 'switch-green.png');
          } else {
            return this.networkElementImage('-20', '-20', 'switch-red.png');
          }
        } else {
          if (d.status === 'up') {
            return this.networkElementImage('-20', '-35', 'wifi-6-green.png');
          } else {
            return this.networkElementImage('-20', '-35', 'wifi-6-red.png');
          }
        }
      })
      .call(d3.drag()
        .on('start', (d) => this.dragstarted(d))
        .on('drag', (d) => this.dragged(d))
        .on('end', (d) => this.dragended(d)));

    this.node.append('title')
      .text(d => 'id: ' + d.id);

    this.gDraw.call(d3.zoom().on('zoom',  (d) =>  {
      console.log('trans');
      console.log(d3.event);
      // this.link.attr('transform', 'matrix(' + d3.event.transform.k + ',0,0,' + d3.event.transform.k +
      //   ',' + d3.event.transform.x + ',' + d3.event.transform.y + ')');
      // let moveX ;
      // let moveY ;
      // if (d3.event.sourceEvent.type === 'wheel') {
      //   moveX = d3.event.transform.x + d3.event.sourceEvent.x;
      //   moveY = d3.event.transform.y + d3.event.sourceEvent.y;
      // } else {
      //  moveX = d3.event.transform.x;
      //  moveY = d3.event.transform.y;
      // }

      d3.selectAll('.trans').attr('transform', () => {

        return 'matrix(1,0,0,1,' + d3.event.transform.x + ',' + d3.event.transform.y + ')';
      }).attr('transform-origin', () => {
        console.log(d3.event.sourceEvent.type);
        return''; })
      ;
      this.link.attr('transform', 'matrix(1,0,0,1,' + d3.event.transform.x + ',' + d3.event.transform.y + ')');
      // d3.selectAll('.trans').attr('transform', d3.event.transform);
     }));

    this.simulation
      .nodes(graph.nodes)
      .on('tick', () => this.ticked());

    // this.simulation.force('link')
    //   .links(graph.links);
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

  dragstarted(d) {
    console.log('dragged');
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  ngOnDestroy() {
  }

  networkElementImage(x, y, name) {
    return '<image class="trans" ' +
      'width="40" height="40" x="'
      + x + '" y="' + y + '" href="/assets/images/' + name + '"/>';
  }
}
