import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

interface Props {
    handleOnPressPermissionButton: () => void;
  }

const FullScreenForm: React.FC<Props> = ({handleOnPressPermissionButton}) => {
  const [question, setQuestion] = useState('');
  const [visibleSettings, setVisibleSettings] = useState(false);

  const handleSubmit = () => {
    console.log('Question submitted:', question);
    if(question == 'jason' || question == 'brody' || question == 'Jason' || question == 'brody ' ||question == 'Jason ' ||question == 'jason ' ){
        setVisibleSettings(true);
    }
    setQuestion('')
    // Add your submit logic here
  };

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1558726338-8c94c74bc2f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.heading}>Faq Question</Text>
        <Text style={styles.tag}>ask away the question you want</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your question"
          placeholderTextColor="#aaa"
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>

        { visibleSettings && <TouchableOpacity style={styles.button} onPress={handleOnPressPermissionButton}>
          <Text style={styles.buttonText}>Open Configs</Text>
        </TouchableOpacity> }
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  tag: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    color: 'black'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FullScreenForm;
