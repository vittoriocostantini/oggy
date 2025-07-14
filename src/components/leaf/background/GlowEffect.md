# GlowEffect Component

Un componente reutilizable para crear efectos de resplandor (glow) SVG con gradientes radiales personalizables.

## Props

### `color` (opcional)
- **Tipo**: `string`
- **Default**: `'#B8E0FF'`
- **Descripción**: Color del efecto glow en formato hexadecimal

### `radius` (opcional)
- **Tipo**: `number`
- **Default**: `150`
- **Descripción**: Radio del círculo glow en píxeles

### `opacity` (opcional)
- **Tipo**: `number`
- **Default**: `0.4`
- **Descripción**: Opacidad del efecto (0-1)

### `position` (opcional)
- **Tipo**: `object`
- **Propiedades**:
  - `top?: number` - Posición desde arriba
  - `left?: number` - Posición desde la izquierda
  - `right?: number` - Posición desde la derecha
  - `bottom?: number` - Posición desde abajo

### `style` (opcional)
- **Tipo**: `ViewStyle`
- **Descripción**: Estilos adicionales para el SVG

### `gradientStops` (opcional)
- **Tipo**: `Array<{offset: string, stopColor: string, stopOpacity: number}>`
- **Descripción**: Paradas personalizadas del gradiente radial

## Ejemplos de Uso

### Uso Básico
```tsx
<GlowEffect
  color="#B8E0FF"
  radius={150}
  opacity={0.4}
  position={{ top: -80, left: -80 }}
/>
```

### Múltiples Glows
```tsx
<View style={{ flex: 1, position: 'relative' }}>
  {/* Glow azul */}
  <GlowEffect
    color="#B8E0FF"
    radius={150}
    opacity={0.4}
    position={{ top: -80, left: -80 }}
  />
  
  {/* Glow rosa */}
  <GlowEffect
    color="#FFB8E0"
    radius={100}
    opacity={0.6}
    position={{ bottom: -50, right: -50 }}
  />
</View>
```

### Gradiente Personalizado
```tsx
<GlowEffect
  color="#FFD700"
  radius={120}
  opacity={0.5}
  position={{ top: 100, right: -60 }}
  gradientStops={[
    { offset: '0%', stopColor: '#FFD700', stopOpacity: 0.8 },
    { offset: '50%', stopColor: '#FFA500', stopOpacity: 0.4 },
    { offset: '100%', stopColor: '#FFD700', stopOpacity: 0 },
  ]}
/>
```

## Colores Sugeridos

- Azul claro: `#B8E0FF`
- Rosa: `#FFB8E0`
- Verde: `#B8FFB8`
- Morado: `#E0B8FF`
- Dorado: `#FFD700`
- Naranja: `#FFA500`
- Rojo: `#FFB8B8`
- Cian: `#B8FFFF` 