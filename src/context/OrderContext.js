import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Create a new order
    const createOrder = async (orderData) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "https://ecom-server-u4xj.onrender.com/ecommerce/orders", 
                orderData
            );
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Get user's order history
    const getUserOrders = async (userId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://ecom-server-u4xj.onrender.com/ecommerce/orders/${userId}`
            );
            setOrders(response.data.orders);
            return response.data.orders;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Update order status (for admin use)
    const updateOrderStatus = async (userId, orderId, status) => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                `https://ecom-server-u4xj.onrender.com/ecommerce/orders/${userId}/${orderId}`,
                { status }
            );
            
            // Update local orders state
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.orderId === orderId 
                        ? { ...order, status } 
                        : order
                )
            );
            
            return response.data;
        } catch (error) {
            console.error("Error updating order status:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        orders,
        isLoading,
        createOrder,
        getUserOrders,
        updateOrderStatus
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};
