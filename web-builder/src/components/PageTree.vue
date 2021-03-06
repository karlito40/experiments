<template>
  <div class="tree-container">
    <SLVueTree 
      ref="slVueTree"
      :value="nodes"
      @nodeenter="onNodeEnter"
      @nodeleave="onNodeLeave"
      @drop="onNodeDrop"
      @input="onTreeChange"
      @select="onNodeSelect"
    >
      <template slot="title" slot-scope="{ node }">
        <div :class="[{'remove-gap': !hasChildren(node)}, 'title-item-content']">
          <span class="item-icon">
            <v-icon small v-if="!hasChildren(node)">layers</v-icon>
            <v-icon small v-else-if="node.isExpanded">folder_open</v-icon>
            <v-icon small v-else>folder</v-icon>
          </span>
          {{ node.title }}
        </div>
      </template>


      <template slot="toggle" slot-scope="{ node }">
        <span v-if="hasChildren(node)">
          <v-icon :class="{'arrow-toggle-off': !node.isExpanded}">arrow_drop_down</v-icon>
        </span>
      </template>


      <template slot="sidebar" slot-scope="{ node }">
        <span @click="event => toggleVisibility(node)">
          <v-icon small v-if="!node.data || node.data.visible !== false">visibility</v-icon>
          <v-icon small v-else>visibility_off</v-icon>
        </span>
        <span @click="event => displaySettings(node)">
          <v-icon small>settings</v-icon>
        </span>
      </template>
    </SLVueTree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SLVueTree from 'sl-vue-tree';
import 'sl-vue-tree/dist/sl-vue-tree-dark.css';

export default {
  name: 'PageTree',
  components: { SLVueTree },
  data() {
    return {
      contextMenuIsVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      nodes: 'currentTree'
    }),
  },
  methods: {
    hasChildren(node) {
      return node.children && node.children.length;
    },
    displaySettings(node) {
      const $slVueTree = this.$refs.slVueTree;
      const nodeModel = $slVueTree.getNodeModel(node.path);

      this.$store.dispatch('showNodeSettings', nodeModel);
    },
    toggleVisibility(node) {
      event.stopPropagation();
      const slVueTree = this.$refs.slVueTree;
      const visible = !node.data || node.data.visible !== false;
      slVueTree.updateNode(node.path, {data: { visible: !visible}});
    },
    showContextMenu(node, event) {
      event.preventDefault();
      this.contextMenuIsVisible = true;
      const $contextMenu = this.$refs.contextmenu;
      $contextMenu.style.left = event.clientX + 'px';
      $contextMenu.style.top = event.clientY + 'px';
    },
    removeNode() {
      this.contextMenuIsVisible = false;
      const $slVueTree = this.$refs.slVueTree;
      const paths = $slVueTree.getSelected().map(node => node.path);
      $slVueTree.remove(paths);
    },
    highlightNode(node, active) {
      const $slVueTree = this.$refs.slVueTree;
      const nodeModel = $slVueTree.getNodeModel(node.path);

      this.$store.dispatch('highlightNode', {
        nodeId: nodeModel.id,
        highlight: active,
      });
    },
    onTreeChange(newTree) {
      this.$store.dispatch('setTree', newTree);
    },
    onNodeDrop(draggingNodes, cursorPosition) { // eslint-disable-line
      this.resetHighlightNodes();

      // this.highlightNode(cursorPosition.node, true);

      // const paths = $slVueTree.getSelected().map(node => node.path);
      // paths.forEach(path => {
      //   const nodeModel = $slVueTree.getNodeModel(path);

      //   this.$store.dispatch('highlightNode', {
      //     nodeId: nodeModel.id,
      //     highlight: true,
      //   });
      // });
    },
    onNodeEnter(node) {
      this.highlightNode(node, true);
    },
    onNodeLeave(node) {
      if(!node.isSelected) {
        this.highlightNode(node, false);
      }
    },
    onNodeSelect(nodes) {
      this.resetHighlightNodes();
    },
    resetHighlightNodes() {
      const $slVueTree = this.$refs.slVueTree;
      
      $slVueTree.traverseModels(nodeModel => {
        if(nodeModel.data && nodeModel.data.highlight && !nodeModel.isSelected) {
          this.$store.dispatch('highlightNode', {
            nodeId: nodeModel.id,
            highlight: false,
          });
        }
      }, this.nodes);
    }
    
  },
}

</script>

<style scoped>
.arrow-toggle-off {
  transform: rotate(-90deg);
}

>>> .sl-vue-tree.sl-vue-tree-root {
  background: transparent;
  border: 0;
  color: inherit;
}

>>> .sl-vue-tree-node-item:hover,
.sl-vue-tree-node-item.sl-vue-tree-cursor-hover {
  background-color: rgba(255, 255, 255, 0.15);
}

>>> .sl-vue-tree-selected > .sl-vue-tree-node-item {
  background-color: rgba(0, 0, 0, 0.3);
}

>>> .sl-vue-tree-node-item {
  /* line-height: 40px; */
  line-height: auto;
}

>>> .sl-vue-tree-cursor {
  background: white !important;
}

>>> .sl-vue-tree-toggle .v-icon {
  position: relative;
  top: 2px;
  left: -5px;
}

>>> .sl-vue-tree-title {
  display: flex;
}

>>> .sl-vue-tree-gap {
  width: 15px;
}

>>> .sl-vue-tree-sidebar span {
  margin-left: 10px;
}

.remove-gap {
  margin-left: -25px;
}

</style>