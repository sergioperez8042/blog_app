// Script de prueba para verificar la API
const testAPI = async () => {
  try {
    console.log('Testing API endpoint...');
    
    const response = await fetch('http://localhost:3002/api/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Article',
        category: 'Technology',
        contentType: 'ideas'
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✓ API funcionando correctamente');
      console.log('Generated content:', data.content);
    } else {
      console.log('✗ Error en la API:', data.error);
    }
  } catch (error) {
    console.log('✗ Error de conexión:', error.message);
  }
};

testAPI();
