import { gql } from '@apollo/client';

export const POKEMON_FIELDS = gql`
  fragment PokemonFields on Pokemon {
    key
    baseForme
    baseSpecies
    baseStats {
      attack
      defense
      hp
      specialattack
      specialdefense
      speed
    }
    baseStatsTotal
    bulbapediaPage
    color
    cosmeticFormes
    eggGroups
    flavorTexts {
      flavor
      game
    }
    gender {
      female
      male
    }
    height
    species
    sprite
    weight
  }
`;

export const GET_ALL_POKEMONS = gql`
  ${POKEMON_FIELDS}
  query getAllPokemon($take: Int!, $offset: Int!) {
    getAllPokemon(take: $take, offset: $offset) {
      ...PokemonFields
    }
  }
`;

export const SEARCH = gql`
  ${POKEMON_FIELDS}
  query getFuzzyPokemon($pokemon: String!) {
    getFuzzyPokemon(pokemon: $pokemon, take: 10) {
      ...PokemonFields
    }
  }
`;
