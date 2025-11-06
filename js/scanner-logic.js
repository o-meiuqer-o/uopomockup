// UOPO Scanner Logic - Food Detection
// This file handles food detection via camera and bounding box placement

class UOPOScanner {
    constructor() {
        this.detectionResults = [];
        this.currentFoodIndex = 0;
    }
    
    // Initialize camera access
    async startScanner() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log('📷 Camera stream started');
            return stream;
        } catch (error) {
            console.error('❌ Camera access denied:', error);
            return null;
        }
    }
    
    // Stop camera stream
    stopScanner(stream) {
        stream.getTracks().forEach(track => track.stop());
        console.log('📷 Camera stream stopped');
    }
    
    // Detect food from image
    detectFood(imageData) {
        // Simulate food detection with random selection from database
        const foods = this.getFoodsDatabase();
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        
        const detection = {
            foodName: randomFood.name,
            category: randomFood.category,
            confidence: (85 + Math.random() * 10).toFixed(0), // 85-95%
            calories: randomFood.portions[0].calories,
            protein: randomFood.portions[0].protein,
            carbs: randomFood.portions[0].carbs,
            fat: randomFood.portions[0].fat,
            portion: randomFood.portions[0].size,
            boundingBox: this.generateBoundingBox(),
            timestamp: new Date().toLocaleTimeString()
        };
        
        console.log('🎯 Food detected:', detection.foodName);
        return detection;
    }
    
    // Generate random bounding box coordinates
    generateBoundingBox() {
        return {
            x: Math.random() * 300,
            y: Math.random() * 300,
            width: 150 + Math.random() * 100,
            height: 150 + Math.random() * 100
        };
    }
    
    // Get foods database
    getFoodsDatabase() {
        return [
            { name: "Chicken Biryani", category: "Rice Dishes", portions: [{ size: "1 plate (250g)", calories: 450, protein: 25, carbs: 45, fat: 18 }] },
            { name: "Idli with Sambar", category: "South Indian", portions: [{ size: "2 idlis", calories: 120, protein: 4, carbs: 22, fat: 1 }] },
            { name: "Dosa", category: "South Indian", portions: [{ size: "1 medium dosa", calories: 150, protein: 3, carbs: 25, fat: 5 }] },
            { name: "Haleem", category: "Meat Dishes", portions: [{ size: "1 bowl (200g)", calories: 280, protein: 22, carbs: 18, fat: 12 }] },
            { name: "Mirchi Ka Salan", category: "Vegetarian", portions: [{ size: "1 serving (150g)", calories: 180, protein: 2, carbs: 12, fat: 14 }] },
            { name: "Hyderabadi Dum Pukht", category: "Meat Dishes", portions: [{ size: "1 serving (250g)", calories: 320, protein: 28, carbs: 20, fat: 15 }] },
            { name: "Galauti Kebab", category: "Meat Dishes", portions: [{ size: "2 pieces", calories: 160, protein: 12, carbs: 8, fat: 9 }] },
            { name: "Khichdi", category: "Light Meals", portions: [{ size: "1 bowl (200g)", calories: 180, protein: 6, carbs: 28, fat: 5 }] },
            { name: "Upma", category: "Breakfast", portions: [{ size: "1 serving (180g)", calories: 160, protein: 4, carbs: 24, fat: 5 }] },
            { name: "Pesarattu", category: "South Indian", portions: [{ size: "1 crepe", calories: 140, protein: 5, carbs: 20, fat: 4 }] },
            { name: "Nihari", category: "Meat Dishes", portions: [{ size: "1 serving (250g)", calories: 340, protein: 30, carbs: 15, fat: 18 }] },
            { name: "Bagara Rice", category: "Rice Dishes", portions: [{ size: "1 cup (180g)", calories: 280, protein: 8, carbs: 45, fat: 6 }] },
            { name: "Tomato Rice", category: "Rice Dishes", portions: [{ size: "1 cup (180g)", calories: 220, protein: 6, carbs: 40, fat: 4 }] },
            { name: "Vegetable Pulao", category: "Rice Dishes", portions: [{ size: "1 cup (180g)", calories: 240, protein: 6, carbs: 42, fat: 5 }] },
            { name: "Chicken Curry", category: "Curries", portions: [{ size: "1 serving (200g)", calories: 210, protein: 22, carbs: 8, fat: 10 }] },
            { name: "Paneer Tikka", category: "Appetizers", portions: [{ size: "4 pieces", calories: 160, protein: 14, carbs: 4, fat: 9 }] },
            { name: "Samosa", category: "Snacks", portions: [{ size: "1 piece", calories: 130, protein: 3, carbs: 15, fat: 6 }] },
            { name: "Falafel", category: "Snacks", portions: [{ size: "3 pieces", calories: 150, protein: 5, carbs: 14, fat: 8 }] },
            { name: "Vegetable Biryani", category: "Rice Dishes", portions: [{ size: "1 plate (250g)", calories: 320, protein: 8, carbs: 48, fat: 10 }] },
            { name: "Lentil Soup", category: "Soups", portions: [{ size: "1 bowl (250ml)", calories: 130, protein: 8, carbs: 20, fat: 1 }] }
        ];
    }
    
    // Store detection result to session
    storeDetectionResult(result) {
        sessionStorage.setItem('detectionResult', JSON.stringify(result));
        console.log('💾 Detection result stored');
    }
    
    // Get detection result from session
    getDetectionResult() {
        const result = sessionStorage.getItem('detectionResult');
        return result ? JSON.parse(result) : null;
    }
    
    // Clear stored result
    clearDetectionResult() {
        sessionStorage.removeItem('detectionResult');
    }
    
    // Process multiple detections
    processMultipleDetections(imageFrames) {
        return imageFrames.map(frame => this.detectFood(frame));
    }
    
    // Calculate nutrition confidence
    calculateConfidence(imageQuality) {
        // Confidence based on image quality (0-100)
        // Good lighting and clear focus = higher confidence
        return Math.min(95, 70 + (imageQuality * 0.25));
    }
    
    // Get nutrition recommendations based on detected food
    getNutritionRecommendations(foodName) {
        const recommendations = {
            "Chicken Biryani": "High calorie. Pair with vegetable salad for balanced nutrition.",
            "Idli with Sambar": "Light and nutritious. Good for breakfast.",
            "Dosa": "Good source of carbs. Add vegetables for more nutrients.",
            "Haleem": "Protein-rich. Portion control recommended.",
            "Vegetable Biryani": "Balanced meal. Ensure adequate protein intake for the day.",
            "default": "Maintain balanced portions and include vegetables."
        };
        return recommendations[foodName] || recommendations["default"];
    }
}

// Initialize scanner
const scanner = new UOPOScanner();

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UOPOScanner;
}