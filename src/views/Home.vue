<template>
  <div class="flex">
    <!-- Navigation -->
    <Nav />

    <!-- Contenu principal -->
    <div class="flex-1 h-screen bg-[#ECDFCC] p-6 ml-64 rounded-xl">
      <h1 class="text-2xl font-bold text-[#1E201E]">Dashboard</h1>

      <!-- Section Statistiques -->
      <div class="grid grid-cols-2 gap-6 mt-6">
        <!-- Graphique en Camembert -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-[#1E201E] mb-4">type of users</h2>
          <PieChart :chart-data="pieData" :chart-options="chartOptions" />
        </div>

        <!-- Graphique en Barres -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-[#1E201E] mb-4">Users</h2>
          <BarChart :chart-data="barData" :chart-options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "@/Nav.vue";
import { PieChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

// Enregistrement des composants Chart.js
Chart.register(...registerables);

// Données pour le graphique en camembert
const pieData = ref({
  labels: ["Admin", "User",],
  datasets: [
    {
      label: "Ventes",
      data: [1, 1,], // Valeurs fictives
      backgroundColor: ["#3C3D37", "#697565", "#ECDFCC"],
    },
  ],
});

// Données pour le graphique en barres
const barData = ref({
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
  datasets: [
    {
      label: "Count",
      data: [10,20 ,30, 40,50 ], // Valeurs fictives
      backgroundColor: "#1E201E",
    },
  ],
});

// Options générales des graphiques
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<style>
/*
  base color
  1E201E
  3C3D37
  697565
  ECDFCC
 */
</style>
