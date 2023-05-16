<template>
  <ChinchillaRedact />
</template>

<script>
import ChinchillaRedact from '~/components/ChinchillaRedact/ChinchillaRedact'

export default {
  name: 'CreatePage',

  components: { ChinchillaRedact },

  layout: 'profileLayout',

  middleware: 'auth',
}
</script>
