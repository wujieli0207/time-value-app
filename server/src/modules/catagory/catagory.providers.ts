import { Catagory } from './entities/catagory.entity';

export const CatagoryProviders = [
  {
    provide: 'CATAGORY_REPOSITORY',
    useValue: Catagory,
  },
];
