import {Component, ElementRef, Input, NgModule, OnInit, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {miserables} from './data';
import * as d3 from 'd3';
import {nodeLocation} from './NodeLocationInterface';

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
  xx: any[] = [];
  xxx = {};
  yy: any[] = [];
  yyy = {};

  private tooltip1: any;
  private tooltip2: any;
  private tooltip3: any;
  private tooltip4: any;
  private tooltip5: any;
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
      .force('collision', d3.forceCollide().radius(d => 50))
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
    console.log('render');
    const t = this;
    let xw: any = '';
    let yw: any = '';
    let xw1: any = '';
    let yw1: any = '';

    this.node
      .attr('cx', d => {
        t.xxx = {id: d.id, x: d.x};
        t.xx.push(t.xxx);
        return d.x; })
      .attr('cy', d => {
        t.yyy = {id: d.id, y: d.y};
        t.yy.push(t.yyy);
        return d.y; })
      .attr('x', d => {
         return d.x - 12; })
      .attr('y', d => {
        return d.y - 12; });

    this.link
      .attr('x1', d => {
        const source = d.source;
        for (let index = 0; index < t.xx.length; index++) {
          if (source === t.xx[index].id) {
            xw = t.xx[index].x;
            t.xx.splice(index, 1);
            break;
          }
        }
        return xw; })

      .attr('y1', d => {
        const source = d.source;
        for (let index = 0; index < t.yy.length; index++) {
          if (source === t.yy[index].id) {
            yw = t.yy[index].y;
            t.yy.splice(index, 1);
            break;
          }
        }
        return yw; })

      .attr('x2', d => {
        const target = d.target;
        for (let index = 0; index < t.xx.length; index++) {
          if (target === t.xx[index].id) {
            xw1 = t.xx[index].x;
            t.xx.splice(index, 1);
            break;
          }
        }
        return xw1; })

      .attr('y2', d => {
        const target = d.target;
        for (let index = 0; index < t.yy.length; index++) {
          if (target === t.yy[index].id) {
            yw1 = t.yy[index].y;
            t.yy.splice(index, 1);
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
        this.tooltip5 = this.gDraw.append('text')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('fill', 'voilet');
        this.tooltip5
          .attr('x', posX + 10)
          .attr('y', posY - 45)
          .text('Eigenvector centrality: ' + d.eigenvectorCentrality);
      }).on('mouseout', () => {
          this.tooltip1.style('visibility', 'hidden');
          this.tooltip2.style('visibility', 'hidden');
          this.tooltip3.style('visibility', 'hidden');
          this.tooltip4.style('visibility', 'hidden');
          this.tooltip5.style('visibility', 'hidden');
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

    // tslint:disable-next-line:max-line-length
    const svgRouter = '<g class="trans"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m1-7v3h2l-3 3l-3-3h2v-3m-6 0h3v2l3-3l-3-3v2H5m6 0V8H9l3-3l3 3h-2v3m6 0h-3V9l-3 3l3 3v-2h3" /></g>';
    const svgWifi =  '<g class="trans"><path d="M4.93 4.93A9.969 9.969 0 0 0 2 12c0 2.76 1.12 5.26 2.93 7.07l1.41-1.41A7.938 7.938 0 0 1 4 12c0-2.21.89-4.22 2.34-5.66L4.93 4.93m14.14 0l-1.41 1.41A7.955 7.955 0 0 1 20 12c0 2.22-.89 4.22-2.34 5.66l1.41 1.41A9.969 9.969 0 0 0 22 12c0-2.76-1.12-5.26-2.93-7.07M7.76 7.76A5.98 5.98 0 0 0 6 12c0 1.65.67 3.15 1.76 4.24l1.41-1.41A3.99 3.99 0 0 1 8 12c0-1.11.45-2.11 1.17-2.83L7.76 7.76m8.48 0l-1.41 1.41A3.99 3.99 0 0 1 16 12c0 1.11-.45 2.11-1.17 2.83l1.41 1.41A5.98 5.98 0 0 0 18 12c0-1.65-.67-3.15-1.76-4.24M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2z"/></g>';

    this.node = this.gDraw.append('g')
      .attr('class', 'nodes')
      .selectAll()
      .data(graph.nodes)
      .enter().append('svg')
      .attr('class', 'svg-class')
      // .attr('width', '24')
      // .attr('height', '24')
      // .attr('viewBox', '0 0 24 24')
      .attr('overflow', 'visible')
      // .attr('transform-origin', '10 0')
      // .attr('preserveAspectRadio', 'xMidYMid')
      .attr('style',
        'display: flex;' +
        'justify-content: center;' +
        'align-items: center;'
     )
      .html((d) => {
        if (d.type === 'core') {
          return svgRouter;
        } else {
          return svgWifi;
        }
      })
      .attr('fill', (d) => this.color(d.group))
      .call(d3.drag()
        .on('start', (d) => this.dragstarted(d))
        .on('drag', (d) => this.dragged(d))
        .on('end', (d) => this.dragended(d)));

    this.node.append('title')
      .text(d => 'id: ' + d.id);

    this.gDraw.call(d3.zoom().on('zoom',  (d) =>  {
      console.log('trans');
      // console.log(d3.event.transform);
      this.link.attr('transform', 'matrix(1,0,0,1,' + d3.event.transform.x + ',' + d3.event.transform.y + ')');
      d3.selectAll('.trans').attr('transform', 'matrix(1,0,0,1,' + d3.event.transform.x + ',' + d3.event.transform.y + ')');
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
}
