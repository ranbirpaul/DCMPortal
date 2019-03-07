import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {DatacenterService} from '../../../datacenter/service/datacenter.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { BuildingService } from '../../../datacenter/service/building.service';
import {FlatToNested} from 'flat-to-nested';
import { ParentChild } from '../../../../shared/model/common/parent.child';

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<LocationNode[]>([]);

  get data(): LocationNode[] { return this.dataChange.value; }

  constructor(private buildigService:BuildingService) {
    this.initialize();
  }

  initialize() {
    var persons: { [id: string] : IPerson; } = {};
    persons["p1"] = { firstName: "F1", lastName: "L1" };
    persons["p2"] = { firstName: "F2",lastName:"L2" };
    persons["p1"] = { firstName: "Altered F1", lastName: "Altered L1" };

    console.log("persons>>");
    console.log(persons);
    let parentChildData:ParentChild[];
    let nestedData:LocationNode[];
    this.buildigService.getBuildingsOnly().subscribe(x=>{
      if(x.length>0){
        console.log('Fetching data for building...');
        console.log(x)
        parentChildData=this.buildigService.getParentChildArray(x);
        console.log(parentChildData);
        nestedData=this.buildigService.getNestedChildren(parentChildData,'')
        console.log(nestedData);
        this.dataChange.next(nestedData);
      }
    });
    console.log();

    let locationTest:LocationNode={item:'Guru',children:[{item:'Sanvi',children:null}]};
    let testdata:any=[
      {item:'abc',Parent:''},
      {item:'def',Parent:'abc'},
      {item:'ultimate 1',Parent:'def'},
      {item:'ultimate 2',Parent:'def'},
  
  ];
console.log('Test data...');

console.log(locationTest);

locationTest=this.buildigService.getNestedChildren(testdata,'')[0];

  console.log(this.buildigService.getNestedChildren(testdata,'')[0]);
  
    const data = this.buildFileTree(TREE_DATA, 0);
    //const data = this.buildFileTree([this.buildigService.getNestedChildren(testdata,'')[0]], 0);

    // Notify the change.
    
  }


  buildFileTree(obj: {[key: string]: any}, level: number): LocationNode[] {
    return Object.keys(obj).reduce<LocationNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new LocationNode();
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

  /** Add an item to to-do list */
  insertItem(parent: LocationNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as LocationNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: LocationNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-datacenter-select',
  templateUrl: './datacenter-select.component.html',
  styleUrls: ['./datacenter-select.component.scss'],
  providers: [ChecklistDatabase]
})
export class DatacenterSelectComponent {

  constructor(
    private database: ChecklistDatabase,
    private formBuilder: FormBuilder,
    private buildingService:BuildingService
  ) { 
    let testdata:any=[
      {Id:'abc',Parent:''},
      {Id:'def',Parent:'abc'},
      {Id:'ultimate 1',Parent:'def'},
      {Id:'ultimate 2',Parent:'def'},
  
  ];

  console.log(this.buildingService.getNestedChildren(testdata,''));
    
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<LocationFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.buildingService.fetchBuilding();
      this.buildingService.getBuildings()
      
      .subscribe(x=>{
        console.log('building>>');
        console.log(x.buildingList);
        if(x.buildingList.length>0){
          console.log('Testing continues...');
          //console.log(this.buildingService.getNestedNode());
          //console.log(this.buildingService.getNestedChildren(this.buildingService.parentChildArrary,''));
        }
      });
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {


  }

      flatNodeMap = new Map<LocationFlatNode, LocationNode>();

      /** Map from nested node to flattened node. This helps us to keep the same object for selection */
      nestedNodeMap = new Map<LocationNode, LocationFlatNode>();
    
      /** A selected parent node to be inserted */
      selectedParent: LocationFlatNode | null = null;
    
      /** The new item's name */
      newItemName = '';
    
      treeControl: FlatTreeControl<LocationFlatNode>;
    
      treeFlattener: MatTreeFlattener<LocationNode, LocationFlatNode>;
    
      dataSource: MatTreeFlatDataSource<LocationNode, LocationFlatNode>;
    
      /** The selection for checklist */
      checklistSelection = new SelectionModel<LocationFlatNode>(true /* multiple */);
    
    
      getLevel = (node: LocationFlatNode) => node.level;
    
      isExpandable = (node: LocationFlatNode) => node.expandable;
    
      getChildren = (node: LocationNode): LocationNode[] => node.children;
    
      hasChild = (_: number, _nodeData: LocationFlatNode) => _nodeData.expandable;
    
      hasNoContent = (_: number, _nodeData: LocationFlatNode) => _nodeData.item === '';
    
      /**
       * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
       */
      transformer = (node: LocationNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item
            ? existingNode
            : new LocationFlatNode();
        flatNode.item = node.item;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
      }
    
      /** Whether all the descendants of the node are selected. */
      descendantsAllSelected(node: LocationFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
      }
    
      /** Whether part of the descendants are selected */
      descendantsPartiallySelected(node: LocationFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
      }
    
      /** Toggle the to-do item selection. Select/deselect all the descendants node */
      todoItemSelectionToggle(node: LocationFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
          ? this.checklistSelection.select(...descendants)
          : this.checklistSelection.deselect(...descendants);
    
        // Force update for the parent
        descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
      }
    
      /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
      todoLeafItemSelectionToggle(node: LocationFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
      }
    
      /* Checks all the parents when a leaf node is selected/unselected */
      checkAllParentsSelection(node: LocationFlatNode): void {
        let parent: LocationFlatNode | null = this.getParentNode(node);
        while (parent) {
          this.checkRootNodeSelection(parent);
          parent = this.getParentNode(parent);
        }
      }
    
      /** Check root node checked state and change it accordingly */
      checkRootNodeSelection(node: LocationFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
          this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
          this.checklistSelection.select(node);
        }
      }
    
      /* Get the parent node of a node */
      getParentNode(node: LocationFlatNode): LocationFlatNode | null {
        const currentLevel = this.getLevel(node);
    
        if (currentLevel < 1) {
          return null;
        }
    
        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    
        for (let i = startIndex; i >= 0; i--) {
          const currentNode = this.treeControl.dataNodes[i];
    
          if (this.getLevel(currentNode) < currentLevel) {
            return currentNode;
          }
        }
        return null;
      } 

}

export interface Role {
  value: string;
  viewValue: string;
}
export class LocationNode {
  children: LocationNode[];
  item: string;
}

export class LocationFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

const TREE_DATA = {
    'Australia': null,
    'Europe': null,
    'North America': null,
    'Asia Pacific': {
      China: null,
      India: {
        Delhi:['Delhi'],
        Karnataka:{
          Bengaluru:{
            'ABB Site':['ABB Building1','ABB Building2']
          }
        }
      },
      Japan: null
    }
};

export interface IPerson{
  firstName:string;
  lastName:string;

}