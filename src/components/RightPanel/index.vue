<template>
    <div class="right-panel">
        <detail-panel/>
        <minimap/>
    </div>
</template>
<script>
import Minimap from "./Minimap";
import DetailPanel from './DetailPanel'
export default {
    name: '',
    components: {
        Minimap,
        DetailPanel
    }
}
</script>
<style scoped>
.right-panel {
    display: flex;
    flex-direction: column;
    width: 280px;
    justify-content: space-between;
}
</style>