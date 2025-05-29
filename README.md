# Modern Dark Portfolio

A professional, modern portfolio website with a dark theme, featuring sections for About Me, Studies, Experience, Projects, and Contact.

## Features

- Responsive design that works on all devices
- Dark theme with elegant color scheme
- Smooth scrolling and animations
- Interactive project filtering
- Contact form
- Mobile-friendly navigation

## File Structure

```
dark-portfolio/
├── css/
│   └── style.css
├── img/
│   └── (place your images here)
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Getting Started

1. Clone or download this repository
2. Replace the placeholder content in `index.html` with your personal information
3. Add your own images to the `img/` directory
4. Customize the colors in `css/style.css` if desired
5. Open `index.html` in a web browser to view your portfolio

## Image Requirements

You'll need to add the following images to the `img/` directory:

- `profile.jpg` - Your profile picture (recommended size: 400x400px)
- `project1.jpg`, `project2.jpg`, etc. - Images for your projects (recommended size: 600x400px)

## Customization

### Changing Colors

To modify the color scheme, edit the CSS variables at the top of the `css/style.css` file:

```css
:root {
    --primary-color: #121212;
    --secondary-color: #1e1e1e;
    --accent-color: #4d4d4d;
    --highlight-color: #64ffda;
    --text-color: #e0e0e0;
    --text-secondary: #a0a0a0;
    /* ... */
}
```

### Adding Projects

To add a new project, copy and paste the project card HTML structure in the Projects section and update the content:

```html
<div class="project-card" data-category="your-category">
    <div class="project-img">
        <img src="img/your-project-image.jpg" alt="Project Title">
    </div>
    <div class="project-info">
        <h3>Project Title</h3>
        <p>Project Type</p>
        <div class="project-links">
            <a href="#" target="_blank"><i class="fas fa-external-link-alt"></i></a>
            <a href="#" target="_blank"><i class="fab fa-github"></i></a>
        </div>
    </div>
</div>
```

## Contact Form

The contact form is set up for demonstration purposes. To make it functional, you'll need to implement server-side processing or use a form submission service like Formspree or Netlify Forms.

## License

This project is available for personal and commercial use.
