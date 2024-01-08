<script lang="ts">
	export let data;
</script>

{#if !data.registrant}
	<h1 class="text-3xl font-bold">Participant does not exist</h1>
{/if}
