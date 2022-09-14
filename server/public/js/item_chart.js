var mychart = document.getElementById("myPieChart").getContext('2d');
let round_graph = new Chart(mychart, {
  type: 'doughnut',
  data: {
    labels: ['Billed Samples (Today)', 'Collected Samples (Today)', 'Completed Test (Today)', 'Pending For Validation'],
    datasets: [{
      lable: 'Samples',
      data: [
        document.getElementById('billed_sample_today').innerHTML,
        document.getElementById('bleeded_sample_today').innerHTML,
        document.getElementById('completed_sample_today').innerHTML,
        document.getElementById('pending_sample_today').innerHTML
      ],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }]
  }

})