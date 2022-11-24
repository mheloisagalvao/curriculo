Parse.serverURL = 'https://parseapi.back4app.com'; 
Parse.initialize(
  'yWAlE3HCDOEe5aQis54EZdnYqlNe9FagBAzELtVU', 
  'CmAKPhkfVAYguAanaORuMqijo8jFJdeIBTyutAwx' 
);

const recado = Parse.Object.extend("recado");

const checkrecados = document.getElementById("checkrecados");
const texto = document.getElementById("texto");
const botaoPostar = document.getElementById("botaoPostar");

const leitura = async () => {

  const query = new Parse.Query(recado);
  try {

    const results = await query.find();
    checkrecados.innerHTML = "";

    for (const recado of results) {

      const descricao = recado.get("descricao");
      const lirecado = document.createElement("li");
      const textNode = document.createTextNode(
        ` ${descricao}`
      );

      lirecado.appendChild(textNode);
      checkrecados.appendChild(lirecado);
    }

  } catch (error) {
    console.error("Erro", error);
  }
};

const inserir = async () => {

  const descricao = texto.value.trim();
  if (!descricao) {
    alert("Por favor digite um texto!");
    return;
  }
  const recado = new Parse.Object("recado");
  recado.set("descricao", descricao);
  try {

    const result = await recado.save();
    console.log("recado criado", result.id);
  } catch (error) {
    console.error("Erro", error);
  }
  texto.value = "";
  texto.focus();
  leitura();
};

leitura();

botaoPostar.onclick = inserir;