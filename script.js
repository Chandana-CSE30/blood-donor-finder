function validateForm() {
    let age = document.getElementById("age").value;
    let mobile= document.getElementById("mobile").value;
    let name =document.getElementById("name").value;
    if(name=="")
    {
        alert("Please Enter Your Name");
        return false;
    }
    if(age < 18){
        alert("Age must be 18 or above!");
        return false;
    }
    if(mobile.length!=10)
    {
        alert("Mobile Number must be 10 digits");
        return false;
    }
    let donor={
        name:document.getElementById("name").value,
        age:document.getElementById("age").value,
        bloodGroup:document.getElementById("bloodGroup").value,
        mobile:document.getElementById("mobile").value,
        city:document.getElementById("city").value,
        availability:document.getElementById("availability").value
    };
    let donors=JSON.parse(localStorage.getItem("donors"))|| [];
    let mobileExists = donors.some(function(donor)
{
    return donor.mobile === mobile;
});

if(mobileExists)
{
    alert("Mobile Number Already Registered!");
    return;
}
    donors.push(donor);
    localStorage.setItem("donors",JSON.stringify(donors));
    alert("Donor Registered Successfully!");
    return false;
}
function loadDonors()
{
    let donors=JSON.parse(localStorage.getItem("donors"))|| [];
    let table=document.getElementById("donorTable");
    if(!table) return;
    table.innerHTML ="";
    donors.forEach(function(donor , index)
{
    table.innerHTML += `
    <tr>
       
        <td>${donor.name}</td>
        <td>${donor.bloodGroup}</td>
        <td>${donor.mobile}
        <br> <a href="tel:${donor.mobile}" class="call-btn"> Call </a></td>
        <td>${donor.city}</td>
        <td>${donor.availability}</td>
        <td>
       <button class="edit-btn" onclick="editDonor(${index})">
    ✏️ Edit
</button>

<button class="delete-btn" onclick="deleteDonor(${index})">
    🗑️ Delete
</button>
</td>
    </tr>
        `;
});
document.getElementById("donorCount").innerHTML="Total Registered Donors : " +donors.length;

}
function searchDonors() {

    let bloodGroup =
        document.querySelector("select").value;

    let city =
        document.querySelector('input[placeholder="Enter City"]').value.toLowerCase();

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    let table =
        document.getElementById("donorTable");

    table.innerHTML = "";
     document.getElementById("noResult").innerHTML="";
    let found=false;
    donors.forEach(function(donor) {

        if (
            (bloodGroup === "Select Blood Group" ||
             donor.bloodGroup === bloodGroup)
            &&
            (city === "" ||
             donor.city.toLowerCase() === city)
        ) {
            found=true;
            table.innerHTML += `
            <tr>
                
                <td>${donor.name}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.mobile}</td>
                <td>${donor.city}</td>
                <td>${donor.availability}</td>
            </tr>`;
           
        }
    });
    if(!found)
    {
     document.getElementById("noResult").innerHTML=" No donors found!";   
    }
}
function deleteDonor(index)
{
    if(confirm("Are you sure you want to delete this donor?"))
    {
        let donors = 
        JSON.parse(localStorage.getItem("donors")) || [];

        donors.splice(index,1);

        localStorage.setItem(
            "donors",
            JSON.stringify(donors)
        );

        loadDonors();
    }
}
function editDonor(index)
{
    let donors =
    JSON.parse(localStorage.getItem("donors")) || [];

    let newName =
    prompt("Enter New Name", donors[index].name);

    let newCity =
    prompt("Enter New City", donors[index].city);

    let newMobile =
    prompt("Enter New Mobile Number", donors[index].mobile);

    let newAvailability =
    prompt(
        "Enter Availability (Available / Not Available)",
        donors[index].availability
    );

    if(newName && newCity && newMobile && newAvailability)
    {
        donors[index].name = newName;
        donors[index].city = newCity;
        donors[index].mobile = newMobile;
        donors[index].availability = newAvailability;

        localStorage.setItem(
            "donors",
            JSON.stringify(donors)
        );

        loadDonors();

        alert("Donor details updated successfully!");
    }
}