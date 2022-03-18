<template>
    <div class="col-12 lg:col-6">
      <div class="card">
        <canvas id="donut_chart"></canvas>
        <br>
        <div class="card">
          <h2>chart // Desayuno  //  Aquí van imágenes // aquí kcal <Button label="Añadir" class="p-button-success" /></h2> 
        </div>
        <div class="card">
          <h2>chart // Comida //  Aquí van imágenes // aquí kcal <Button label="Añadir" class="p-button-success" /></h2>  
        </div>        
        <div class="card">
          <h2>chart // Cena  //  Aquí van imágenes // aquí kcal <Button label="Añadir" class="p-button-success" /> </h2>
        </div>        
      </div>	
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
	data() {
		return {
      type:"doughnut",
			data: {
            labels: ['Carbohidratos','Proteinas','Grasas'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ["#FF6384","#36A2EB","#FFCE56"],
                    hoverBackgroundColor: ["#FF6384","#36A2EB","#FFCE56"],
                    
                }
            ]},
			options: {
        responsive: true,
        aspectRatio: 2,
        align:"center",
        cutout:'70%',
        plugins:{
          legend: {
            display: true,
            position: 'right',
            labels: {
                boxWidth: 20,
                boxHeight: 20,
                padding: 15,
                font:{
                  size:18.3,
                  style:"normal"
                  }
                }
          }}
        
        },
      duotonePlugin : {
            id:"duotoneText",
            afterDatasetsDraw(chart){
              const {ctx, chartArea:{
                top,width,height
              }} = chart;
              ctx.font= "30px Arial"
              ctx.textAlign="center"
              ctx.fillText("Prueba",width/2,height/2+top)
            }
        }
		}
  },
  mounted(){
    const ctx = document.getElementById('donut_chart');
    new Chart(ctx, {
      type:this.type,
      data: this.data,
      options: this.options,
      plugins: [this.duotonePlugin]
    });
  }
}
</script>
<style>

</style>
