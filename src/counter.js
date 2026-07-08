const getData = async () => {
try {
const data = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
);

const jsonData = await data.json();
console.log(jsonData);

} catch (error) {
 (console.error(error));

  } finally {
    console.log("Terminé");
    
 }
};
getData();

//const getData = () => {
  //fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20")

    //.then((response) => { return response.json();})
    //.then((jsonData) => { console.log(jsonData);})
    //.catch((error) => {console.error(error);})
    //.finally(() => { console.log("Terminé");});
//};
//getData();