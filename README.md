# 🌤️ Enhanced Weather App

A stunning, professional-grade weather application featuring real-time weather data, detailed forecasts, and beautiful glassmorphism design.

## ✨ Features

### 🌟 **Core Features**
- **Real-time weather data** from AccuWeather API
- **5-day detailed forecast** with daily summaries
- **8 comprehensive weather metrics** (humidity, wind, pressure, UV index, etc.)
- **Dynamic weather themes** that change based on conditions
- **Professional glassmorphism design** with modern UI
- **Fully responsive** - works perfectly on all devices

### 🎨 **Visual Enhancements**
- **Advanced glassmorphism effects** with backdrop blur
- **Animated gradient backgrounds** with floating particles
- **Weather-specific color themes** (sunny, rainy, cloudy, snowy, stormy)
- **Smooth micro-interactions** and hover effects
- **Text shimmer effects** and animated elements
- **Professional typography** with responsive scaling

### 📱 **User Experience**
- **Enter key support** for quick searches
- **Loading animations** with visual feedback
- **Error handling** with animated notifications
- **Touch-optimized** for mobile devices
- **Accessibility features** (reduced motion, high contrast)
- **Easter egg animations** for fun interactions

## 🚀 Getting Started

### Prerequisites

1. **Get a free AccuWeather API key:**
   - Go to [AccuWeather Developer Portal](https://developer.accuweather.com/)
   - Create a free account
   - Create a new application
   - Copy your API key from the dashboard

### 🔧 Setup

1. **Clone or download this project**
   ```bash
   git clone https://github.com/Shanidhya01/weather-app.git
   cd weather-app
   ```

2. **Update the API key in `script.js`:**
   ```javascript
   const ACCUWEATHER_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key
   ```

3. **Start a local server:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   
   # Using Live Server (VS Code extension)
   Right-click index.html → "Open with Live Server"
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:8000
   ```

## 📊 Weather Data

### **Current Weather Information:**
- 🌡️ **Temperature** - Current temperature in Celsius
- 🌡️ **Feels Like** - Real feel temperature
- 💧 **Humidity** - Relative humidity percentage
- 💨 **Wind Speed** - Wind speed in km/h
- 🧭 **Wind Direction** - Wind direction (N, NE, E, etc.)
- 📊 **Pressure** - Atmospheric pressure in hPa
- 👁️ **Visibility** - Visibility distance in km
- ☀️ **UV Index** - UV radiation level
- 🌡️ **Min/Max** - Daily temperature range

### **5-Day Forecast:**
- Daily weather summaries
- High and low temperatures
- Weather conditions and descriptions
- Interactive forecast cards

## 🎨 Design Themes

The app automatically changes its visual theme based on weather conditions:

- **☀️ Sunny** - Warm golden gradients
- **🌧️ Rainy** - Cool blue tones
- **☁️ Cloudy** - Soft gray palette
- **❄️ Snowy** - Clean white theme
- **⛈️ Stormy** - Dark atmospheric colors

## 📱 Responsive Design

### **Mobile-First Approach:**
- Optimized for phones (320px and up)
- Tablet-friendly layouts (768px and up)
- Desktop optimization (1200px and up)
- Fluid typography with `clamp()` functions
- Touch-friendly interactive elements

### **Breakpoints:**
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1200px
- **Large Desktop**: 1201px+

## 🔧 Configuration

### **API Configuration:**
```javascript
// In script.js
const ACCUWEATHER_API_KEY = "YOUR_API_KEY_HERE";
```

### **Customization Options:**
- Modify color themes in CSS custom properties
- Adjust animation speeds and effects
- Change responsive breakpoints
- Customize weather icons and emojis

## 🐛 Troubleshooting

### **Common Issues:**

#### "City not found" Error
- **Cause:** Invalid city name or API key
- **Solution:** 
  - Check spelling of city name
  - Verify API key is correct and active
  - Ensure you have API calls remaining (50/day limit)

#### Weather data not loading
- Check browser console (F12) for error messages
- Verify internet connection
- Confirm API key has remaining calls
- Try a different city name

#### Styling issues
- Clear browser cache
- Ensure all CSS files are loading
- Check for JavaScript errors in console

#### Mobile display problems
- Enable responsive design mode in browser
- Check viewport meta tag in HTML
- Verify CSS media queries are working

### **API Rate Limits:**
- **AccuWeather Free Tier:** 50 calls per day
- Each weather request uses 2 API calls (location + weather)
- Monitor your usage in the AccuWeather developer portal

## 📁 Project Structure

```
weatherapp/
├── index.html              # Main HTML structure
├── script.js               # JavaScript functionality & API calls
├── styles.css              # Enhanced CSS with glassmorphism
├── README.md              # Project documentation
├── test.html              # Simple testing page (optional)
└── simple.html            # Minimal version (optional)
```

## 🛠️ Technologies Used

### **Frontend:**
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with custom properties
- **Vanilla JavaScript** - ES6+ features
- **CSS Grid & Flexbox** - Modern layouts
- **CSS Animations** - Smooth transitions

### **API & Services:**
- **AccuWeather API** - Weather data provider
- **Fetch API** - HTTP requests
- **Geolocation** - Location services (future feature)

### **Design Features:**
- **Glassmorphism** - Modern glass-like effects
- **Responsive Design** - Mobile-first approach
- **CSS Custom Properties** - Dynamic theming
- **Backdrop Filters** - Advanced visual effects

## 🎯 Future Enhancements

### **Planned Features:**
- 🗺️ **Interactive Weather Maps**
- 📍 **Geolocation Support**
- 📊 **Advanced Charts** (temperature trends, rainfall)
- 🔔 **Weather Alerts** and notifications
- 🌍 **Multiple Language Support**
- 💾 **Local Storage** for favorite cities
- 🌙 **Dark/Light Mode Toggle**
- 📱 **PWA Support** (Progressive Web App)

### **Technical Improvements:**
- Service Worker for offline functionality
- Better error handling and retry logic
- Unit tests and automated testing
- Performance optimizations
- SEO enhancements

## 🎮 Easter Eggs

- **Rainbow Effect:** Click "Get Weather" 10 times for a surprise animation
- **Konami Code:** Try the classic gaming sequence (↑↑↓↓←→←→BA)
- **Weather Themes:** Each weather condition triggers unique visual themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AccuWeather** for providing reliable weather data
- **CSS Glassmorphism** design inspiration
- **Modern web development** best practices
- **Responsive design** principles

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Look for similar issues in the project issues
3. Create a new issue with detailed information
4. Include browser console errors and screenshots

---

**⭐ Star this repository if you found it helpful!**

**🔗 [Live Demo](https://your-weather-app-demo.com)** | **📖 [Documentation](https://github.com/yourusername/weather-app/wiki)** | **🐛 [Report Bug](https://github.com/yourusername/weather-app/issues)**
