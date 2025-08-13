// 1. Interfaces
interface ProgressCardsProps {
  children: React.ReactNode;
  colorCard?: string;
  style?: StyleProp<ViewStyle>;
}

interface ProgressProps {
  value: number;
  type?: "circular" | "linear";
  color?: string;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  strokeWidth?: number;
}

interface ChildrenProps {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

// 2. Componente principal y subcomponentes
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Función de utilidad para truncar texto
export const truncateText = (text: string, maxLength: number = 10) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const ProgressCards = ({ children, colorCard, style }: ProgressCardsProps) => (
  <View
    style={[
      styles.card,
      colorCard ? { backgroundColor: colorCard } : null,
      style,
    ]}
  >
    {children}
  </View>
);

/**
 * Title: Contenedor para el título de la tarjeta
 * Props: children, style
 */
ProgressCards.Title = ({ children, style }: ChildrenProps) => (
  <View style={[styles.titleContainer, style]}>{children}</View>
);

/**
 * TruncatedText: Componente de texto que automáticamente trunca el contenido
 * Props: children, style, maxLength
 */
ProgressCards.TruncatedText = ({
  children,
  style,
  maxLength = 20,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  maxLength?: number;
}) => {
  if (typeof children === "string") {
    return <Text style={style}>{truncateText(children, maxLength)}</Text>;
  }
  return <Text style={style}>{children}</Text>;
};

/**
 * Progress: Barra de progreso lineal o circular
 * Props: value, type, color, style, radius, strokeWidth
 */
ProgressCards.Progress = ({
  value,
  type = "linear",
  color = "#2563eb",
  style,
  radius = 18,
  strokeWidth = 4,
}: ProgressProps) => {
  if (type === "circular") {
    // Ajuste: dejar margen para el stroke
    const size = radius * 2 + strokeWidth;
    const center = size / 2;
    const adjustedRadius = radius;
    const circumference = 2 * Math.PI * adjustedRadius;
    const progress = (value / 100) * circumference;
    const strokeDashoffset = circumference - progress;
    return (
      <View
        style={[
          styles.progressCircularContainer,
          { width: size, height: size },
          style,
        ]}
      >
        <Svg width={size} height={size}>
          <Circle
            cx={center}
            cy={center}
            r={adjustedRadius}
            stroke="#ececec"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={center}
            cy={center}
            r={adjustedRadius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference},${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${center},${center}`}
          />
        </Svg>
        <View
          style={[styles.circularLabelContainer, { width: size, height: size }]}
        >
          <Text style={styles.circularLabel}>{`${Math.round(value)}%`}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.progressBarBg, style]}>
      <View
        style={[
          styles.progressBar,
          { width: `${value}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
};

/**
 * TotalTask: Contenedor para mostrar el total de tareas
 * Props: children, style
 */
ProgressCards.TotalTask = ({ children, style }: ChildrenProps) => (
  <View style={[styles.totalTaskContainer, style]}>{children}</View>
);

/**
 * Icon: Contenedor para el icono de la tarjeta
 * Props: children, color, style
 */
ProgressCards.Icon = ({ children, color, style }: ChildrenProps) => (
  <View
    style={[
      styles.iconContainer,
      color ? { backgroundColor: color } : null,
      style,
    ]}
  >
    {children}
  </View>
);

/**
 * StatusTime: Composable, acepta children o props time y status
 * Si recibe children, los renderiza; si no, usa time y status
 */
ProgressCards.StatusTime = ({
  children,
  time,
  status,
}: {
  children?: React.ReactNode;
  time?: string;
  status?: "done" | "in-progress" | "to-do";
}) => {
  if (children) return <View style={{ marginTop: 16 }}>{children}</View>;
  if (!time || !status) return null;
  let statusText = "";
  let statusColor = "";
  let statusBg = "";
  switch (status) {
    case "done":
      statusText = "Done";
      statusColor = "#a78bfa";
      statusBg = "#ede9fe";
      break;
    case "in-progress":
      statusText = "In Progress";
      statusColor = "#fb923c";
      statusBg = "#fff7ed";
      break;
    case "to-do":
      statusText = "To-do";
      statusColor = "#38bdf8";
      statusBg = "#f0f9ff";
      break;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <MaterialCommunityIcons
          name="clock"
          size={18}
          color="#a78bfa"
          style={{ marginRight: 4 }}
        />
        <Text style={{ color: "#a78bfa", fontSize: 16, fontWeight: "500" }}>
          {time}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: statusBg,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 2,
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ color: statusColor, fontWeight: "400", fontSize: 13 }}>
          {statusText}
        </Text>
      </View>
    </View>
  );
};

// 3. Estilos
const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: 260,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  titleContainer: {
    marginBottom: 8,
  },
  progressBarBg: {
    width: "100%",
    height: 7,
    borderRadius: 4,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginTop: 12,
  },
  progressBar: {
    height: 7,
    borderRadius: 4,
  },
  progressCircularContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  circularLabelContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  circularLabel: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#222",
  },
  totalTaskContainer: {
    marginTop: 8,
    borderRadius: 20,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
  },
});

// 4. Exportación
export default ProgressCards;
