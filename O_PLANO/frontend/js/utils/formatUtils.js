export function formatDate(dateString) {
     //Converter string para um objeto Date
     const [date, time] = dateString.split(' ');
     const [dia, mes, ano] = date.split('-').map(Number);
     const [hora, min] = time.split(':').map(Number);

     const dateStringEmMilis = new Date(ano, mes - 1, dia, hora, min);
     const dataAtual = new Date();

     const diffInMs = dataAtual - dateStringEmMilis;

     const diffInMin = Math.floor(diffInMs / (1000 * 60));
     const diffInHora = Math.floor(diffInMs / (1000 * 60 * 60));
     const diffInDia = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

     /*
     console.log('Data Atual: ', dataAtual);
     console.log('Data publicação obj date: ', dateStringEmMilis);

     console.log('Data: ', date,'\nHora: ', time);
     console.log('Dia: ', dia,'\nMês: ', mes, '\nAno: ', ano);
     console.log('Hora: ', hora,'\nMinuto: ', min);

     console.log('Resultado Milis: ', diffInMs);
     console.log('Resultado Min: ', diffInMin);
     console.log('Resultado Hora: ', diffInHora);
     console.log('Resultado Dia: ', diffInDia);
     */
     if(diffInMin < 60){
         return `Publicado há ${diffInMin} minutos.`
     }
     else if(diffInHora < 24) {
         if(diffInHora == 1){
             return `Publicado há ${diffInHora} hora.`

         }
         return `Publicado há ${diffInHora} horas.`
     }
     else if(diffInDia == 1){
         return `Publicado há ${diffInDia} dia.`

     }
     else{
         
         return `Publicado em ${date.replaceAll('-','/')} às ${time}.`
     }
}
