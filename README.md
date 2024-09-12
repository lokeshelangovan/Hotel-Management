# Hotel-Management

We can book hotels, restaurants and resorts

Style for the navbar-toggler button
.navbar-toggler {
position: absolute;
top: 10px; /_ Adjust as needed _/
right: 10px; /_ Adjust as needed _/
border: none;
background-color: transparent; /_ Make sure background is transparent _/
z-index: 1001; /_ Ensure the toggle button is above other elements _/
}

/_ Style for the navbar-toggler icon _/
.navbar-toggler-icon {
background-image: url('path-to-your-white-toggle-icon.svg'); /_ Ensure the icon is white _/
background-size: contain;
background-repeat: no-repeat;
width: 30px; /_ Adjust size as needed _/
height: 30px; /_ Adjust size as needed _/
}

/_ Ensure the navbar is positioned correctly _/
.navbar {
position: relative; /_ Ensure proper positioning within its container _/
z-index: 1000; /_ Ensure the navbar stays on top of other elements _/
}

/_ Ensure the expanded navbar does not overflow _/
.collapse.navbar-collapse {
position: absolute; /_ Position absolutely to stay within the navbar _/
top: 100%; /_ Position directly below the navbar _/
left: 0;
right: 0;
z-index: 999; /_ Ensure dropdown menu is above other elements _/
/_ margin-top: 50px; Add space to align with navbar _/
}

/_ Style the expanded navbar _/
.navbar-collapse.show {
background-color: black; /_ Dark background color _/
border-top: 2px solid #fea116; /_ Optional: Add a border at the top _/
text-align: center;
}

/_ Style the navbar items when expanded _/
.navbar-nav .nav-item .nav-link {
color: #ffffff; /_ White text color _/
padding: 10px 20px; /_ Adjust padding for larger clickable area _/
border-bottom: 1px solid #444; /_ Optional: Add a border between items _/
}

/_ Change the color of the active nav link _/
.navbar-nav .nav-item .nav-link.active {
background-color: #fea116; /_ Highlight background color for the active link _/
color: #000000; /_ Change text color to black _/
}

/_ Style the dropdown menu in the expanded navbar _/
.navbar-nav .nav-item .dropdown-menu {
background-color: #343a40; /_ Dark background color for dropdown _/
border: none; /_ Remove border _/
}

/_ Style the dropdown items _/
.navbar-nav .nav-item .dropdown-menu .dropdown-item {
color: #ffffff; /_ White text color _/
padding: 10px 20px; /_ Adjust padding _/
}

/_ Highlight the dropdown item on hover _/
.navbar-nav .nav-item .dropdown-menu .dropdown-item:hover {
background-color: #fea116; /_ Highlight color on hover _/
color: #000000; /_ Change text color on hover _/
}
