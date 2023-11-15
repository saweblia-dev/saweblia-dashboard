import React, { useState } from 'react';
import backgroundImage from '../../assets/logo.png';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    console.log("FormData",formData)
    setFormData({
      ...formData,
      [name]: value,
    });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:44314/Admin/authenticate', formData);
      
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('authToken', token);
      // Handle the response accordingly
      console.log(response.data);

      // Reset the form after successful submission
      setFormData({
        UserName: '',
        Password: '',
      });
      console.log('goooooooooooood')
      window.location = "/";
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error submitting form:', error);
      console.log("errooooor")
    }
  };

  return (
    <div>
      
    
<div class="bg-no-repeat bg-cover bg-center relative justify-between" 
style={{
    backgroundImage: `url(${backgroundImage})`,
    height: '100vh', 
    
  }}
>
    <div class="absolute bg-gradient-to-b from-blue-900 to-blue-800 opacity-75 inset-0 z-0"></div>
    {/* <div class="absolute  opacity-75 inset-0 z-0"></div> */}

  <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
      <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
        <div class="self-start hidden lg:flex flex-col  text-white">
         {/* <img src={backgroundImage} alt="Background" className="mb-3" /> */}

          {/* <h1 class="mb-3 font-bold text-5xl">Hi ? Welcome to Saweblia </h1>
          <p class="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups</p> */}
        </div>
      </div>
      <div class="flex justify-center self-center  z-10">
        <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <form method='Post'onSubmit={handleSubmit}>
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">se connecter </h3>
              <p class="text-gray-500">Connectez-vous à votre compte s'il vous plaît.</p>
            </div>
            <div class="space-y-5">
                        <div class="space-y-2">
                              <label class="text-sm font-medium text-gray-700 tracking-wide"> Nom d'utilisateur </label>
              <input 
                value={formData.UserName}
                onChange={handleChange}
              name="UserName" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-900" type="" placeholder="Nom" />
              </div>
                          <div class="space-y-2">
              <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
              Mot de passe
              </label>
              <input 
             type="password"
               value={formData.Password}
               onChange={handleChange}
              name='Password' class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-900" 
              placeholder="Tapez votre mot de passe" />
            </div>
              <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                Souviens-toi de moi
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="text-blue-900 hover:text-green-500">
                Mot de passe oublié?
                </a>
              </div>
            </div>
            <div>
              <button type="submit" class="w-full flex justify-center bg-blue-900  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
              Se connecter
              </button>
            </div>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
              <span>
                Saweblie © 2023-2024
                <a href="https://www.saweblia.ma" rel="" target="_blank" title="Ajimon" class="text-green hover:text-blue-800 ">AJI</a></span>
            </div>
            </form>
        </div>
      </div>
  </div>
</div>
	
    </div>
  )
}

export default Login