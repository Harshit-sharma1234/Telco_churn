document.addEventListener('DOMContentLoaded', function () {
  // Function to show specific content in the Learn More tab
  function showContent(contentId) {
    console.log(`Attempting to show content with ID: ${contentId}`);

    // Hide all content sections in the Learn More tab
    document.querySelectorAll('.hidden-content, .active-content').forEach(section => {
      section.classList.add('hidden-content');
      section.classList.remove('active-content');
    });

    // Show the targeted content
    const content = document.getElementById(contentId);
    if (content) {
      content.classList.remove('hidden-content');
      content.classList.add('active-content');
      console.log(`Content with ID ${contentId} is now visible.`);
    } else {
      console.error(`Content with ID ${contentId} not found.`);
    }
  }

  // Add event listeners for all navigation buttons
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.id.replace('_btn', ''); // Extract content ID from button ID
      console.log(`Button clicked! Target content ID: ${targetId}`);
      showContent(`content_${targetId}`);
    });
  });

  
});
