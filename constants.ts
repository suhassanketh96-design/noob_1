
import { PCPart, PartCategory } from './types';

export const PC_PARTS: PCPart[] = [
  // CPUs
  {
    id: 'cpu-1',
    name: 'Core i9-14900K',
    brand: 'Intel',
    category: PartCategory.CPU,
    price: 589,
    performanceScore: 98,
    specs: { cores: 24, threads: 32, clock: '6.0 GHz' },
    imageUrl: 'https://picsum.photos/seed/cpu1/400/300'
  },
  {
    id: 'cpu-2',
    name: 'Ryzen 9 7950X3D',
    brand: 'AMD',
    category: PartCategory.CPU,
    price: 699,
    performanceScore: 99,
    specs: { cores: 16, threads: 32, clock: '5.7 GHz' },
    imageUrl: 'https://picsum.photos/seed/cpu2/400/300'
  },
  {
    id: 'cpu-3',
    name: 'Ryzen 5 7600',
    brand: 'AMD',
    category: PartCategory.CPU,
    price: 229,
    performanceScore: 75,
    specs: { cores: 6, threads: 12, clock: '5.1 GHz' },
    imageUrl: 'https://picsum.photos/seed/cpu3/400/300'
  },
  // GPUs
  {
    id: 'gpu-1',
    name: 'RTX 4090 OC Edition',
    brand: 'NVIDIA',
    category: PartCategory.GPU,
    price: 1699,
    performanceScore: 100,
    specs: { vram: '24GB GDDR6X', power: '450W' },
    imageUrl: 'https://picsum.photos/seed/gpu1/400/300'
  },
  {
    id: 'gpu-2',
    name: 'Radeon RX 7900 XTX',
    brand: 'AMD',
    category: PartCategory.GPU,
    price: 949,
    performanceScore: 92,
    specs: { vram: '24GB GDDR6', power: '355W' },
    imageUrl: 'https://picsum.photos/seed/gpu2/400/300'
  },
  {
    id: 'gpu-3',
    name: 'RTX 4070 Super',
    brand: 'NVIDIA',
    category: PartCategory.GPU,
    price: 599,
    performanceScore: 82,
    specs: { vram: '12GB GDDR6X', power: '220W' },
    imageUrl: 'https://picsum.photos/seed/gpu3/400/300'
  },
  // Motherboards
  {
    id: 'mobo-1',
    name: 'ROG Maximus Z790 Hero',
    brand: 'ASUS',
    category: PartCategory.MOTHERBOARD,
    price: 629,
    performanceScore: 95,
    specs: { socket: 'LGA1700', chipset: 'Z790' },
    imageUrl: 'https://picsum.photos/seed/mobo1/400/300'
  },
  // RAM
  {
    id: 'ram-1',
    name: 'Dominator Titanium 64GB DDR5',
    brand: 'Corsair',
    category: PartCategory.RAM,
    price: 349,
    performanceScore: 96,
    specs: { speed: '7200MHz', capacity: '64GB' },
    imageUrl: 'https://picsum.photos/seed/ram1/400/300'
  },
  // Storage
  {
    id: 'ssd-1',
    name: '990 Pro 2TB NVMe',
    brand: 'Samsung',
    category: PartCategory.STORAGE,
    price: 179,
    performanceScore: 97,
    specs: { speed: '7450MB/s', interface: 'PCIe 4.0' },
    imageUrl: 'https://picsum.photos/seed/ssd1/400/300'
  },
  // PSU
  {
    id: 'psu-1',
    name: 'HX1200 Platinum',
    brand: 'Corsair',
    category: PartCategory.POWER_SUPPLY,
    price: 249,
    performanceScore: 94,
    specs: { wattage: '1200W', efficiency: '80+ Platinum' },
    imageUrl: 'https://picsum.photos/seed/psu1/400/300'
  }
];
