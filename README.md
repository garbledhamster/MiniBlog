# MiniBlog

![Logo](./screenshots/logo.png)  
*[INPUT SCREENSHOT HERE]*

Welcome to **MiniBlog**, a lightweight and intuitive web application designed to help you create, manage, and export your blog posts with ease. Whether you're a beginner or an experienced blogger, MiniBlog offers a seamless experience to organize your thoughts and share them with the world.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Usage](#usage)
  - [Accessing MiniBlog](#accessing-miniblog)
  - [Adding a New Post](#adding-a-new-post)
  - [Editing a Post](#editing-a-post)
  - [Deleting a Post](#deleting-a-post)
  - [Exporting Your Blog](#exporting-your-blog)
  - [Importing Your Blog](#importing-your-blog)
  - [Using Commands](#using-commands)
  - [Zooming and Sorting](#zooming-and-sorting)
  - [Clearing All Data](#clearing-all-data)
- [Command Reference](#command-reference)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Create, Edit, and Delete Posts:** Easily manage your blog content with user-friendly forms.
- **Export and Import JSON:** Backup your blog data or migrate it to another instance effortlessly.
- **Command Autocomplete:** Utilize intuitive commands for streamlined blogging operations.
- **Zoom and Sort:** Customize your viewing experience with zoom levels and sorting options.
- **Search Functionality:** Quickly find posts using the search bar with support for exact and partial matches.
- **Responsive Design:** Access and manage your blog from any device with a clean and responsive interface.

## Screenshots

### Home Page

![Home Page](./screenshots/home.png)  
*[INPUT SCREENSHOT HERE]*

### Add New Post Form

![Add Post Form](./screenshots/add-post-form.png)  
*[INPUT SCREENSHOT HERE]*

### Editing a Post

![Edit Post](./screenshots/edit-post.png)  
*[INPUT SCREENSHOT HERE]*

### Exporting JSON

![Export JSON](./screenshots/export-json.png)  
*[INPUT SCREENSHOT HERE]*

### Importing JSON

![Import JSON](./screenshots/import-json.png)  
*[INPUT SCREENSHOT HERE]*

### Command Autocomplete

![Command Autocomplete](./screenshots/command-autocomplete.png)  
*[INPUT SCREENSHOT HERE]*

### Zoom and Sort Controls

![Zoom and Sort](./screenshots/zoom-sort.png)  
*[INPUT SCREENSHOT HERE]*

## Usage

### Accessing MiniBlog

Access your MiniBlog application through GitHub Pages:

[**Live Demo**](https://garbledhamster.github.io/MiniBlog/)

### Adding a New Post

1. **Open the Add Post Form**

   Click on the **➕ Add New Post** button located in the control panel.

   ![Open Add Post Form](./screenshots/open-add-post-form.png)  
   *[INPUT SCREENSHOT HERE]*

2. **Fill in the Post Details**

   - **Picture URL:** Enter the URL of an image to associate with the post. If left blank, a random image will be assigned automatically.
   - **Background Color:** Choose a background color for the image container.
   - **Title:** Provide a title for your post.
   - **Description:** Enter a brief description.
   - **Date:** Input the date in `MM/DD/YYYY` format. Defaults to today's date if not specified.
   - **Body:** Write your content using Markdown syntax.

   ![Fill Post Details](./screenshots/fill-post-details.png)  
   *[INPUT SCREENSHOT HERE]*

3. **Save the Post**

   Click the **💾 Save Post** button to add the post to your blog.

   ![Save Post](./screenshots/save-post.png)  
   *[INPUT SCREENSHOT HERE]*

### Editing a Post

1. **Locate the Post**

   Find the post you wish to edit in the **Latest Grid**.

2. **Open the Edit Form**

   Click on the **✏️ Edit Post** button associated with the post.

   ![Edit Post Button](./screenshots/edit-post-button.png)  
   *[INPUT SCREENSHOT HERE]*

3. **Modify the Details**

   Update the desired fields in the form.

4. **Save Changes**

   Click the **💾 Save Post** button to apply the changes.

### Deleting a Post

1. **Locate the Post**

   Find the post you wish to delete in the **Latest Grid**.

2. **Delete the Post**

   Click on the **🗑️ Delete Post** button associated with the post.

   ![Delete Post Button](./screenshots/delete-post-button.png)  
   *[INPUT SCREENSHOT HERE]*

3. **Confirm Deletion**

   A confirmation prompt will appear. Click **OK** to proceed.

### Exporting Your Blog

1. **Click the Export Button**

   Click on the **📥 Export JSON** button in the control panel.

   ![Export JSON Button](./screenshots/export-json-button.png)  
   *[INPUT SCREENSHOT HERE]*

2. **Download the JSON File**

   A JSON file containing your blog data will be downloaded to your device.

   ![Export Successful](./screenshots/export-success.png)  
   *[INPUT SCREENSHOT HERE]*

### Importing Your Blog

1. **Click the Import Button**

   Click on the **📂 Load JSON** button in the control panel.

   ![Load JSON Button](./screenshots/load-json-button.png)  
   *[INPUT SCREENSHOT HERE]*

2. **Select the JSON File**

   Choose the previously exported JSON file from your device.

   ![Select JSON File](./screenshots/select-json-file.png)  
   *[INPUT SCREENSHOT HERE]*

3. **Import and View Your Blog**

   The application will load the data, and your posts will appear in the **Latest Grid**.

   ![Import Successful](./screenshots/import-success.png)  
   *[INPUT SCREENSHOT HERE]*

### Using Commands

MiniBlog supports various commands to enhance your blogging experience. To access commands, type `/` in the **Command Input** field.

1. **Open Command Input**

   Click on the **Command Input** field and type `/` to see available commands.

   ![Command Input](./screenshots/command-input.png)  
   *[INPUT SCREENSHOT HERE]*

2. **Select a Command**

   As you type, a suggestion box will appear. Use the arrow keys or mouse to select a command.

   ![Command Suggestions](./screenshots/command-suggestions.png)  
   *[INPUT SCREENSHOT HERE]*

3. **Execute the Command**

   Press **Enter** to execute the selected command.

### Zooming and Sorting

**Zooming:**

- Click the **🔍 Zoom** button to cycle through different zoom levels (75%, 100%, 125%, 150%).

  ![Zoom Button](./screenshots/zoom-button.png)  
  *[INPUT SCREENSHOT HERE]*

**Sorting:**

- Click the **🚫 Sort** button to cycle through sorting options:
  - **🚫 No Sorting**
  - **🗓️ Sort by Date**
  - **🔡 Sort by Name**
  - **🎨 Sort by Color**

  ![Sort Button](./screenshots/sort-button.png)  
  *[INPUT SCREENSHOT HERE]*

### Clearing All Data

1. **Click the Clear Button**

   Click on the **🧹 Clear All** button in the control panel.

   ![Clear Button](./screenshots/clear-button.png)  
   *[INPUT SCREENSHOT HERE]*

2. **Confirm Clearing**

   A confirmation prompt will appear. Click **OK** to remove all data from local storage.

## Command Reference

MiniBlog supports the following commands to streamline your blogging process. Access them by typing `/` in the **Command Input** field.

### `/createpost 'Your Title Here'`

**Description:** Creates a new blog post with the provided title.

**Example:**

```
/createpost 'My First Blog Post'
```

### `/generatepost 'Your Prompt Here'`

**Description:** Generates blog content based on the provided prompt using OpenAI's API.

**Example:**

```
/generatepost 'Write a blog post about the benefits of remote work.'
```

### `/saveapikey 'Your_API_Key_Here'`

**Description:** Registers your OpenAI API key for content generation.

**Example:**

```
/saveapikey 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
```

### `/clearapikey`

**Description:** Removes the currently registered OpenAI API key.

**Example:**

```
/clearapikey
```

## License

This project is licensed under the [MIT License](./LICENSE).

## Acknowledgements

- [Marked.js](https://github.com/markedjs/marked) for Markdown parsing.
- [DOMPurify](https://github.com/cure53/DOMPurify) for sanitizing HTML.
- [GitHub Pages](https://pages.github.com/) for hosting the live demo.

---

*Made with ❤️ by [Your Name](https://github.com/garbledhamster)*

---

*[INPUT SCREENSHOT HERE]*
