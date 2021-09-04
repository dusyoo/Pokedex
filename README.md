Created by Dustin Yoo
[Repo here](https://github.com/dusyoo/Pokedex)
This website was built using HTML, CSS, and Javascript. I used Visual Studio code and PokeAPI.

# Pokedex

A Pokédex is an electronic device (in this case, a website) designed to catalogue and provide information regarding the various species of Pokémon featured in the Pokémon video game, anime and manga series

# The Website

Features:

- There is 1 main page where it displays pokemon cards with their image, number, name and abilities
- Select the toggle switch to select a theme of modern (light) or go walk down memory lane and pick retro (dark).
- Search for a specific pokemon by typing their name.
- Click the 'Abilities' button on the pokemon's card to display their abilities.
- Click the 'Abilities' button again to hide their abilities.

# Notes

- Tried my best to decompose code and keep things organized, but admittedly the CSS is a bit messy
- A majority of the challenges I faced were Javascript related where I would have trouble with DOM event delegation
- Had trouble using event delegation for dynamically toggling the abilities button, where only even pokemons 'Abilities' button would display. This was fixed by adding e.stopImmediatePropagation(). This one was a huge learning process for me.
- There are minor imperfections such as the search bar not being centered when expanded, 'Abilities' font not changing to corresponding theme.

# Open API

<img src="https://user-images.githubusercontent.com/24237865/83422649-d1b1d980-a464-11ea-8c91-a24fdf89cd6b.png" align="right" width="21%"/>

Pokedex using the [PokeAPI](https://pokeapi.co/) for constructing RESTful API.
PokeAPI provides a RESTful API interface to highly detailed objects built from thousands of lines of data related to Pokémon.
Also used [Pokemon-API](https://purukitto.github.io/pokemon-api/) for pixelated sprites for images.
