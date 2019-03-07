  import { SelectionModel } from '@angular/cdk/collections';
  import { FlatTreeControl } from '@angular/cdk/tree';
  import { Component, Injectable, ElementRef, ViewChild } from '@angular/core';
  import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
  import { BehaviorSubject } from 'rxjs';
  import { AuthenticationService } from '../../../../authentication.service';
  import {CommonService} from '../../../../shared/service/common.service';
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
  import {ObjectSelectStructureComponent} from '../object-select-structure/object-select-structure.component';
  import {ApiService} from '../../../../shared/dataservice/api.service';
  import { ObjectService } from '../../service/object.service';
import { forEach } from '@angular/router/src/utils/collection';

import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';

  
  export class StructureItemNode {
    children: StructureItemNode[];
    item: string;
  }

  export interface DialogData {
    parentObjectId: string;
    model:string;
    type:string;
    objects:any[];
  }
  
  export class StructureItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
  }
  
  let TREE_DATA:any = {};
  
  @Injectable()
  export class ChecklistDatabase {
    dataChange = new BehaviorSubject<StructureItemNode[]>([]);
  
    get data(): StructureItemNode[] { return this.dataChange.value; }


    
  
    constructor() {
      this.initialize();
    }
  
    initialize() {
      const data = this.buildFileTree(TREE_DATA, 0);
      // Notify the change.
      this.dataChange.next(data);
    }
  
    buildFileTree(obj: object, level: number): StructureItemNode[] {      
      return Object.keys(obj).reduce<StructureItemNode[]>((accumulator, key) => {
        const value = obj[key];
        const node = new StructureItemNode();
        node.item = key;
  
        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildFileTree(value, level + 1);
          } else {
            node.item = value;
          }
        }
  
        return accumulator.concat(node);
      }, []);
    }
  
    insertItem(parent: StructureItemNode, name: string): StructureItemNode {
      if (!parent.children) {
        parent.children = [];
      }
      const newItem = { item: name } as StructureItemNode;
      parent.children.push(newItem);
      this.dataChange.next(this.data);
      return newItem;
    }
  
    insertItemAbove(node: StructureItemNode, name: string): StructureItemNode {
      const parentNode = this.getParentFromNodes(node);
      const newItem = { item: name } as StructureItemNode;
      if (parentNode != null) {
        parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
      } else {
        this.data.splice(this.data.indexOf(node), 0, newItem);
      }
      this.dataChange.next(this.data);
      return newItem;
    }
  
    insertItemBelow(node: StructureItemNode, name: string): StructureItemNode {
      const parentNode = this.getParentFromNodes(node);
      const newItem = { item: name } as StructureItemNode;
      if (parentNode != null) {
        parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
      } else {
        this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
      }
      this.dataChange.next(this.data);
      return newItem;
    }
  
    getParentFromNodes(node: StructureItemNode): StructureItemNode {
      for (let i = 0; i < this.data.length; ++i) {
        const currentRoot = this.data[i];
        const parent = this.getParent(currentRoot, node);
        if (parent != null) {
          return parent;
        }
      }
      return null;
    }
  
    getParent(currentRoot: StructureItemNode, node: StructureItemNode): StructureItemNode {
      if (currentRoot.children && currentRoot.children.length > 0) {
        for (let i = 0; i < currentRoot.children.length; ++i) {
          const child = currentRoot.children[i];
          if (child === node) {
            return currentRoot;
          } else if (child.children && child.children.length > 0) {
            const parent = this.getParent(child, node);
            if (parent != null) {
              return parent;
            }
          }
        }
      }
      return null;
    }
  
    updateItem(node: StructureItemNode, name: string) {
      node.item = name;
      this.dataChange.next(this.data);
    }
  
    deleteItem(node: StructureItemNode) {
      this.deleteNode(this.data, node);
      this.dataChange.next(this.data);
    }
  
    copyPasteItem(from: StructureItemNode, to: StructureItemNode): StructureItemNode {
      const newItem = this.insertItem(to, from.item);
      if (from.children) {
        from.children.forEach(child => {
          this.copyPasteItem(child, newItem);
        });
      }
      return newItem;
    }
  
    copyPasteItemAbove(from: StructureItemNode, to: StructureItemNode): StructureItemNode {
      const newItem = this.insertItemAbove(to, from.item);
      if (from.children) {
        from.children.forEach(child => {
          this.copyPasteItem(child, newItem);
        });
      }
      return newItem;
    }
  
    copyPasteItemBelow(from: StructureItemNode, to: StructureItemNode): StructureItemNode {
      const newItem = this.insertItemBelow(to, from.item);
      if (from.children) {
        from.children.forEach(child => {
          this.copyPasteItem(child, newItem);
        });
      }
      return newItem;
    }
  
    deleteNode(nodes: StructureItemNode[], nodeToDelete: StructureItemNode) {
      const index = nodes.indexOf(nodeToDelete, 0);
      if (index > -1) {
        nodes.splice(index, 1);
      } else {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            this.deleteNode(node.children, nodeToDelete);
          }
        });
      }
    }
  }
  

  
  @Component({
    selector: 'app-object-structure-add',
    templateUrl: './object-structure-add.component.html',
    styleUrls: ['./object-structure-add.component.scss'],
    providers: [ChecklistDatabase]
  })
  export class ObjectStructureAddComponent {
    structureName:string="Object";
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<StructureItemFlatNode, StructureItemNode>();
  
    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<StructureItemNode, StructureItemFlatNode>();
  
    /** A selected parent node to be inserted */
    selectedParent: StructureItemFlatNode | null = null;
  
    /** The new item's name */
    newItemName = '';
  
    treeControl: FlatTreeControl<StructureItemFlatNode>;
  
    treeFlattener: MatTreeFlattener<StructureItemNode, StructureItemFlatNode>;
  
    dataSource: MatTreeFlatDataSource<StructureItemNode, StructureItemFlatNode>;
  
    /** The selection for checklist */
    checklistSelection = new SelectionModel<StructureItemFlatNode>(true /* multiple */);
  
    /* Drag and drop */
    dragNode: any;
    dragNodeExpandOverWaitTimeMs = 300;
    dragNodeExpandOverNode: any;
    dragNodeExpandOverTime: number;
    dragNodeExpandOverArea: string;
    isAuthor:boolean=true;
    types:any;
    textArray:any[]=[];
    rootName:string;
    model:string;
    type:string;
    @ViewChild('emptyItem') emptyItem: ElementRef;
  
    constructor(
      private database: ChecklistDatabase,
      private authService:AuthenticationService,
      private commonService:CommonService,
      public dialog: MatDialog,
      private apiService:ApiService,
      private objectService:ObjectService
    ) {
      this.isAuthor=this.authService.isAuthor;

      let postData:any={
        query: "models('abb.dca.location').ofType('abb.dca.location.type@2')"
      }
      this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/query",postData).subscribe(x=>{
        this.textArray=x.data; 
      console.log(this.textArray);
      })
      
      commonService.getStructures().then(x=>{
        console.log('Configuration File...');
        this.types=x;
        console.log(this.types);
      });
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<StructureItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      
      database.dataChange.subscribe(data => {
        this.dataSource.data = [];
        this.dataSource.data = data;
      });
    }
  
    getLevel = (node: StructureItemFlatNode) => node.level;
  
    isExpandable = (node: StructureItemFlatNode) => node.expandable;
  
    getChildren = (node: StructureItemNode): StructureItemNode[] => node.children;
  
    hasChild = (_: number, _nodeData: StructureItemFlatNode) => _nodeData.expandable;
  
    hasNoContent = (_: number, _nodeData: StructureItemFlatNode) => _nodeData.item === '';

    dataSourceDca:any[]=[];
  
    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: StructureItemNode, level: number) => {
      const existingNode = this.nestedNodeMap.get(node);
      const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new StructureItemFlatNode();
      flatNode.item = node.item;
      flatNode.level = level;
      flatNode.expandable = (node.children && node.children.length > 0);
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
    }
  
    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: StructureItemFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      return descendants.every(child => this.checklistSelection.isSelected(child));
    }
  
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: StructureItemFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    }
  
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: StructureItemFlatNode): void {
      
      this.checklistSelection.toggle(node);
      const descendants = this.treeControl.getDescendants(node);
      this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);
    }
  

  

  
    handleDragStart(event, node) {
      // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
      event.dataTransfer.setData('foo', 'bar');
      event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
      this.dragNode = node;
      this.treeControl.collapse(node);
    }
  
    handleDragOver(event, node) {
      event.preventDefault();
  
      // Handle node expand
      if (node === this.dragNodeExpandOverNode) {
        if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
          if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
            this.treeControl.expand(node);
          }
        }
      } else {
        this.dragNodeExpandOverNode = node;
        this.dragNodeExpandOverTime = new Date().getTime();
      }
  
      // Handle drag area
      const percentageX = event.offsetX / event.target.clientWidth;
      const percentageY = event.offsetY / event.target.clientHeight;
      if (percentageY < 0.25) {
        this.dragNodeExpandOverArea = 'above';
      } else if (percentageY > 0.75) {
        this.dragNodeExpandOverArea = 'below';
      } else {
        this.dragNodeExpandOverArea = 'center';
      }
    }
  
    handleDrop(event, node) {
      event.preventDefault();
      if (node !== this.dragNode) {
        let newItem: StructureItemNode;
        if (this.dragNodeExpandOverArea === 'above') {
          newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
        } else if (this.dragNodeExpandOverArea === 'below') {
          newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
        } else {
          newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
        }
        this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
        this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
      }
      this.dragNode = null;
      this.dragNodeExpandOverNode = null;
      this.dragNodeExpandOverTime = 0;
    }
  
    handleDragEnd(event) {
      this.dragNode = null;
      this.dragNodeExpandOverNode = null;
      this.dragNodeExpandOverTime = 0;
    }
  
    getText(id:string){
      let data:any[]=[];

      let obj:any=this.textArray.find(x=>x.objectId==id);
      /*if(!obj){
        this.objectService.getObjectById("abb.ability.device",id)
      }*/
      if(obj){
      if(obj.name)
        return obj.name;
      //this.objectService.getObjectById()
      return id;
      }
      return id;
     /* if(id=='0')
        return 'Location'
      return 'Tenant';
      */
    }
    log(){
      console.log(this.dataSource);
      console.log(this.flatNodeMap);
      console.log(this.treeFlattener);
    }

    onStructureTypeChange(arg:any){
      let model:string = this.types.find(x=>x.type==arg).model;
      this.model=model;
      this.type=arg+"@1";
      console.log('Before fetching records...');
      this.objectService.getObjects(model,arg+"@1").subscribe(x=>{
        console.log(x);
        this.textArray=x.data;
        this.dataSourceDca=x.data;        
        this.refreshTree();
        this.database.initialize();
      });

     

      
    }
public refreshTree(){
  console.log('Testing....');
  console.log(this.dataSourceDca);
  this.dataSourceDca.forEach(x=>{
    let dcaValue:string=x.objectId;
    console.log(x.properties.root.value);
    if(x.properties.root.value){
    this.rootName=x.name;
    TREE_DATA = {
      [x.objectId] :{      
      }
    } 
  }
  })

  console.log(TREE_DATA);
}

    /** Save the node to database */
    saveNode(node: StructureItemFlatNode, itemValue: string) {
      const nestedNode = this.flatNodeMap.get(node);
      this.database.updateItem(nestedNode, itemValue);
    }
        /** Select the category so we can insert the new item. */
    addNewItem(node: StructureItemFlatNode) {
      //-- to be used latter    
      let test:any[];
      const dialogRef = this.dialog.open(ObjectSelectStructureComponent,
            {
             data: {
              parentObjectId:node.item,
              model:this.model,
              type:this.type,
              objects:test
            } 
          }
          );
    
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            this.getReference(node);
          });
    
        }
    createStructureRoot(rootName:string,structureType:string){
          let model:string = this.types.find(x=>x.type==structureType).model;
          let properties:any={};
          let propertyValue={value:true};
          properties["root"]=propertyValue;
          this.objectService.createStructureObject(model,structureType,properties,rootName,true);
        }

        getReference(node:any){
          const parentNode = this.flatNodeMap.get(node);
          this.objectService.geReferenceDataByObjectId(node.item,this.model).subscribe(x=>{
            x.data.forEach(y=>{
              if(y.to.objectId!==node.item){
                console.log('fetching reference---');
                console.log(y.to.objectId);
              const parentNode = this.flatNodeMap.get(node);
              this.database.insertItem(parentNode, y.to.objectId);
              this.treeControl.expand(node);
              }
            });            
           })
        }
        
        
  }