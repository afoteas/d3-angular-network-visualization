import {Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import {networkElements} from './networkElements';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit, OnDestroy {
  name: string;
  svg;
  gMain;
  rect;
  gDraw;
  zoom;
  simulation;
  link;
  node;


  private nodeTooltip: any;
  private linkTooltip: any;


  @Input()

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  @Input()
  miserables;

  @Input()
  width;

  @Input()
  height;

  @ViewChild('topology', {read: ElementRef, static: false }) topoView: ElementRef;


  // constructor(private el: ElementRef) { }
  constructor() { }

  ngOnInit() {
    console.log(this.height);
    console.log(this.width);
  }

  onResize(event) {
      console.log('resize');
      console.log(event.target.innerWidth);
      console.log(event.target.innerHeight);
      console.log(this.topoView.nativeElement.offsetWidth);
      console.log(this.topoView.nativeElement.offsetHeight);
      this.ngAfterViewInit();
      // console.log(this.el.nativeElement.offsetWidth);
      // console.log(this.el.nativeElement.offsetHeight);
  }

  ngAfterViewInit() {
    this.svg = d3.select('svg');
    const width = +this.topoView.nativeElement.offsetWidth;
    const height = +this.topoView.nativeElement.offsetHeight;

    const links = this.miserables.links.map(d => Object.create(d));
    const nodes = this.miserables.nodes.map(d => Object.create(d));

    this.simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => {
        return this.miserables.nodes[d.index].id;
      }))
      .force('charge', d3.forceManyBody().strength((d) => {
        if (this.miserables.nodes[d.index].type === 'router') {
          return -1000;
        } else if (this.miserables.nodes[d.index].type === 'switch') {
          return +100;
        } else {return -1000; }
      }))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d) => {
        if (this.miserables.nodes[d.index].type === 'router') {
          return 60;
        } else if (this.miserables.nodes[d.index].type === 'switch') {
          return 40;
        } else {return 20; }
      }))
      .force('x', d3.forceX(width))
      .force('y', d3.forceY(height));



    this.gMain = this.svg.append('g')
      .classed('g-main', true);

    this.gDraw = this.gMain.append('g');
    this.rect = this.gDraw.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'snow');

    this.render(this.miserables);
  }

  ticked() {

    this.link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    this.node
      .attr('x', d => d.x)
      .attr('y', d => d.y);


    this.node
    .on('mouseover',
      (d) => {
        const [posX, posY] = [d3.event.x, d3.event.y];

        this.nodeTooltip = this.gDraw.append('foreignObject')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('x', posX + 20)
          .attr('y', posY - 105)
          .attr('width', 500)
          .attr('height', 100)
          .attr('color', 'grey')
          .html('<p style="margin: 0.03em">Node ID: ' + d.id + '</p>' +
            (d.name ? '<p style="margin: 0.03em">Name: ' + d.name + '</p>' : '') +
            (d.status ? '<p style="margin: 0.03em">Status: ' + d.status + '</p>' : ''));


      }).on('mouseout', () => {
          this.nodeTooltip.style('visibility', 'hidden');

      }).on('mousemove', (d: any) => {
        d3.select('.chart-tooltip1')
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 'px')
        .text(d[1] - d[0]);
      });

    this.link.on('mouseover',
      (d) => {
        const [posX, posY] = [d3.event.x, d3.event.y];

        this.linkTooltip = this.gDraw.append('foreignObject')
          .attr('font-family', 'Comic Sans MS')
          .attr('font-size', '14px')
          .attr('width', 500)
          .attr('height', 100)
          .attr('x', posX + 10)
          .attr('y', posY - 95)
          .attr('color', 'grey')
          .html('<p style="margin: 0.03em">Link ID: ' + d.id + '</p>' +
            '<p style="margin: 0.03em">Source Tp: ' + d['source-tp'] + '</p>' +
            '<p style="margin: 0.03em">Destination Tp: ' + d['dest-tp'] + '</p>' );


        }).on('mouseout', () => {
          this.linkTooltip.style('visibility', 'hidden');

        }).on('mousemove', (d: any) => {
        d3.select('.chart-tooltip1')
          .style('left', d3.event.pageX + 15 + 'px')
          .style('top', d3.event.pageY - 25 + 'px')
          .text(d[1] - d[0]);
        });

  }

  render(graph) {

    this.link = this.gDraw.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.value))
      .attr('stroke', () => 'Grey');

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
      .attr('fill', (d) => {
        if (d.status === 'up') {
          return '#43992E';
        } else if (d.status === 'down') {
          return '#A64444';
        } else {
          return 'grey';
        }
      })
      .html((d) => {
        if (d.type === 'router') {
          return networkElements.router;
        } else if (d.type === 'switch') {
          return networkElements.switch;
        } else {
          return networkElements.wifi6;
        }
      })
      .call(d3.drag()
        .on('start', (d) => this.dragStarted(d))
        .on('drag', (d) => this.dragged(d))
        .on('end', (d) => this.dragEnded(d)));

    this.node.append('title')
      .text(d => 'id: ' + d.id);

    this.gDraw.call(d3.zoom().on('zoom',  () =>  {


      d3.selectAll('.trans').attr('transform', () => {
        return 'matrix(0.01,0,0,-0.01,' + (-35 + d3.event.transform.x) + ',' + (-5 + d3.event.transform.y) + ')';
      }).attr('transform-origin', () => {
        return 'center'; })
      ;
      this.link.attr('transform', 'matrix(1,0,0,1,' + d3.event.transform.x + ',' + d3.event.transform.y + ')');

     }));

    this.simulation
      .nodes(graph.nodes)
      .on('tick', () => this.ticked());

    this.simulation.force('link')
      .links(graph.links)
      .distance((d) => {
        if (this.miserables.links[d.index].id === 'link1' || this.miserables.links[d.index].id === 'link2') {
          return 200;
        } else  {
          return 60;
        }
      }
      )
      ;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragEnded(d) {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

  dragStarted(d) {
    console.log('dragged');
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  ngOnDestroy() {
  }

}
