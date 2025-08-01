# useIconSelector Hook

Un hook personalizado para manejar la lógica de un selector de iconos con animaciones y estado.

## 📋 Descripción

Este hook proporciona toda la funcionalidad necesaria para un selector de iconos interactivo, incluyendo:
- Estado del icono seleccionado
- Animaciones de expansión/contracción
- Animación de rotación del chevron
- Lista predefinida de iconos
- Callbacks para manejar selecciones

## 🚀 Uso Básico

```tsx
import { useIconSelector } from '../../assets/hooks/icon-selector/use-icon-selector';

function MyComponent() {
  const {
    selectedIcon,
    isExpanded,
    iconOptions,
    animatedHeight,
    animatedOpacity,
    rotateInterpolation,
    handleIconPress,
    handleIconSelect,
    closeSelector,
  } = useIconSelector(
    'briefcase', // icono inicial
    '#FF6B6B',   // color inicial
    (iconName, iconColor) => {
      console.log('Icono seleccionado:', iconName, iconColor);
    }
  );

  return (
    // Tu JSX aquí
  );
}
```

## 📝 Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `initialIconName` | `keyof typeof MaterialCommunityIcons.glyphMap` | ❌ | Nombre del icono inicial |
| `initialIconColor` | `string` | ❌ | Color del icono inicial |
| `onIconSelect` | `(iconName, iconColor) => void` | ❌ | Callback cuando se selecciona un icono |

## 🔄 Valores Retornados

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `selectedIcon` | `{ name: string, color: string }` | Icono actualmente seleccionado |
| `isExpanded` | `boolean` | Estado de expansión del selector |
| `iconOptions` | `IconOption[]` | Lista de iconos disponibles |
| `animatedHeight` | `Animated.Value` | Valor animado para la altura |
| `animatedOpacity` | `Animated.Value` | Valor animado para la opacidad |
| `rotateInterpolation` | `Animated.AnimatedInterpolation` | Interpolación para la rotación del chevron |
| `handleIconPress` | `() => void` | Función para manejar el toque en el icono |
| `handleIconSelect` | `(name: string, color: string) => void` | Función para manejar la selección de un icono |
| `closeSelector` | `() => void` | Función para cerrar el selector |

## 🎨 Iconos Disponibles

El hook incluye una lista predefinida de iconos con colores:

```tsx
const iconOptions = [
  { name: 'briefcase', color: '#FF6B6B', label: 'Work' },
  { name: 'home', color: '#4ECDC4', label: 'Home' },
  { name: 'heart', color: '#FFD93D', label: 'Personal' },
  { name: 'star', color: '#6C5CE7', label: 'Important' },
  { name: 'book', color: '#A8E6CF', label: 'Study' },
  { name: 'car', color: '#FF8B94', label: 'Travel' },
  { name: 'airplane', color: '#74B9FF', label: 'Business' },
  { name: 'gift', color: '#FD79A8', label: 'Gifts' },
];
```

## 🎯 Ejemplo Completo

```tsx
import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIconSelector } from '../../assets/hooks/icon-selector/use-icon-selector';

function IconSelectorExample() {
  const {
    selectedIcon,
    isExpanded,
    iconOptions,
    animatedHeight,
    animatedOpacity,
    rotateInterpolation,
    handleIconPress,
    handleIconSelect,
    closeSelector,
  } = useIconSelector(
    'briefcase',
    '#FF6B6B',
    (iconName, iconColor) => {
      console.log('Nuevo icono seleccionado:', iconName, iconColor);
    }
  );

  return (
    <View>
      {/* Icono principal */}
      <TouchableOpacity onPress={handleIconPress}>
        <View style={{ backgroundColor: selectedIcon.color, borderRadius: 20, padding: 10 }}>
          <MaterialCommunityIcons 
            name={selectedIcon.name} 
            size={20} 
            color="#fff" 
          />
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <MaterialCommunityIcons name="chevron-down" size={16} color="#666" />
        </Animated.View>
      </TouchableOpacity>

      {/* Selector desplegable */}
      <Animated.View style={{ 
        opacity: animatedOpacity, 
        maxHeight: animatedHeight 
      }}>
        {iconOptions.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleIconSelect(icon.name, icon.color)}
          >
            <View style={{ backgroundColor: icon.color, borderRadius: 20, padding: 10 }}>
              <MaterialCommunityIcons 
                name={icon.name} 
                size={20} 
                color="#fff" 
              />
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}
```

## ⚙️ Configuración

### Animaciones
- **Duración**: 300ms
- **Altura expandida**: 240px
- **Rotación del chevron**: 0° a 180°

### Estados
- **Cerrado**: `isExpanded = false`
- **Abierto**: `isExpanded = true`
- **Animando**: Valores interpolados entre 0 y 1

## 🔧 Dependencias

- `react-native-reanimated` (para animaciones)
- `@expo/vector-icons` (para los iconos)
- `react-native` (para Animated)

## 📁 Estructura de Archivos

```
src/assets/hooks/icon-selector/
├── use-icon-selector.ts    # Hook principal
└── README.md              # Esta documentación
```

## 🤝 Contribución

Para agregar nuevos iconos o modificar la funcionalidad:

1. Edita el array `iconOptions` en el hook
2. Actualiza esta documentación
3. Prueba las animaciones
4. Verifica la compatibilidad con TypeScript

## 📝 Notas

- El hook maneja automáticamente el cierre del selector al seleccionar un icono
- Las animaciones son suaves y optimizadas para rendimiento
- El estado se mantiene consistente entre re-renders
- Compatible con React Native y Expo 