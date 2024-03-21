import {pokemonType} from '..';
import IconNormal from '@assets/icons/icon-normal.svg';
import IconFighting from '@assets/icons/icon-fighting.svg';
import IconFlying from '@assets/icons/icon-flying.svg';
import IconPoison from '@assets/icons/icon-poison.svg';
import IconGround from '@assets/icons/icon-ground.svg';
import IconRock from '@assets/icons/icon-rock.svg';
import IconBug from '@assets/icons/icon-bug.svg';
import IconGhost from '@assets/icons/icon-ghost.svg';
import IconSteel from '@assets/icons/icon-steel.svg';
import IconFire from '@assets/icons/icon-fire.svg';
import IconWater from '@assets/icons/icon-water.svg';
import IconGrass from '@assets/icons/icon-grass.svg';
import IconElectric from '@assets/icons/icon-electric.svg';
import IconPsychic from '@assets/icons/icon-psychic.svg';
import IconIce from '@assets/icons/icon-ice.svg';
import IconDragon from '@assets/icons/icon-dragon.svg';
import IconDark from '@assets/icons/icon-dark.svg';
import IconFairy from '@assets/icons/icon-fairy.svg';
import IconShadow from '@assets/icons/icon-shadow.svg';

describe('pokemonType', () => {
  test('normal type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'normal');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconNormal);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconFighting type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'fighting');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconFighting);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconFlying type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'flying');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconFlying);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconPoison type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'poison');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconPoison);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconGround type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'ground');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconGround);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconRock type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'rock');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconRock);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconBug type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'bug');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconBug);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconGhost type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'ghost');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconGhost);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconSteel type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'steel');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconSteel);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconFire type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'fire');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconFire);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconWater type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'water');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconWater);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconGrass type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'grass');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconGrass);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconElectric type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'electric');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconElectric);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconPsychic type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'psychic');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconPsychic);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconIce type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'ice');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconIce);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconDragon type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'dragon');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconDragon);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconDark type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'dark');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconDark);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconFairy type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'fairy');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconFairy);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
  test('IconShadow type should have correct structure and assets', () => {
    const normalType = pokemonType.find(type => type.name === 'shadow');
    expect(normalType).toBeDefined();
    expect(normalType?.icon).toEqual(IconShadow);
    expect(normalType?.background).toBeDefined(); // Assuming this asset exists
  });
});
