import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';
let productId = '';

async function test() {
  try {
    // 1. Register a new user
    console.log('\n1. Testing User Registration...');
    const registerRes = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin1@test.com',
        password: 'password1234',
        role: 'admin'
      })
    });
    const userData = await registerRes.json();
    authToken = userData.token;
    console.log('✓ User registered successfully');

    // 2. Login
    console.log('\n2. Testing Login...');
    const loginRes = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin1@test.com',
        password: 'password1234'
      })
    });
    const loginData = await loginRes.json();
    authToken = loginData.token;
    console.log('✓ Login successful');

    // 3. Create a product
    console.log('\n3. Testing Product Creation...');
    const productRes = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        name: 'Test Product1',
        description: 'A test product1',
        price: 99.991,
        stock: 10
      })
    });
    const productData = await productRes.json();
    productId = productData.id;
    console.log('✓ Product created successfully');

    // 4. Get all products
    console.log('\n4. Testing Get Products...');
    const getProductsRes = await fetch(`${BASE_URL}/products`);
    const products = await getProductsRes.json();
    console.log('✓ Products retrieved successfully');

    // 5. Add to cart
    console.log('\n5. Testing Add to Cart...');
    const cartRes = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 3
      })
    });
    await cartRes.json();
    console.log('✓ Product added to cart');

    // 6. Get cart
    console.log('\n6. Testing Get Cart...');
    const getCartRes = await fetch(`${BASE_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    const cart = await getCartRes.json();
    console.log('✓ Cart retrieved successfully');

    // 7. Create order
    console.log('\n7. Testing Create Order...');
    const orderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    await orderRes.json();
    console.log('✓ Order created successfully');

    // 8. Get orders
    console.log('\n8. Testing Get Orders...');
    const getOrdersRes = await fetch(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    const orders = await getOrdersRes.json();
    console.log('✓ Orders retrieved successfully');

    console.log('\n✨ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

test();