const apiKey = "c2cb2ae24c53cad79fe31aa3c891489f";

const getWeather = async (cityname) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

export default getWeather;
