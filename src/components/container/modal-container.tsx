import React from 'react';
import { View, Modal, Pressable, StyleSheet } from 'react-native';

interface ModalContainerProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalContainer({ visible, onClose, children }: ModalContainerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.modalContent}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    position: 'absolute',
    top: '25%',
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
});

export default ModalContainer; 