import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import * as BABYLON from 'babylonjs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from "three";

// const OBJLoader = require('three-obj-loader');

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  items: Array<any>;

  constructor(
    private router: Router,
    public itemService: ItemService,
  ){
    
  }

  @ViewChild('myCanvas', {static: false})
  myCanvas: HTMLCanvasElement;


  public Objectloader(){
    // var canvas = document.getElementById('renderCanvas');
    // let canvas = this.myCanvas;
    // canvas.innerHTML = 'canvas';
    console.log(this.myCanvas);
    var engine = new BABYLON.Engine(this.myCanvas, true);
    
    // var engine =new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
    BABYLON.SceneLoader.Load("../../../assets/object/", "alexstrasza.glb", engine, function (scene) { 
      // do something with the scene
   });
  }

  ngOnInit(){
    this.myCanvas=<HTMLCanvasElement>document.getElementById('myCanvas');
    this.items = this.itemService.getItems();
    this.Objectloader();
  }
 
}
