$(document).ready(()=>{
   const addStudent  = (students) => {
        $('.student-list').empty();
        $('.student-list').append(`<th>First Name</th><th>Last Name</th><th>Grades</th>`)
            $.each(students, function (index, value) {
                $('.student-list').append(`
                <tr> 
                <td>${value.firstName}</td>
                <td>${value.lastName}</td>
                <td>${value.grade}</td>
                <td><button class="delete" data-id="${value.id}" >Delete</button></td> 
                <td><button class="update" data-id="${value.id}" >Update</button></td> 
                </tr>
                </div><hr>
                `)
            })
          
        }

    $('.student-list').on('click', 'button.delete', function(){
        var id = $(this).data("id");
        $.ajax({
            context:this,
            type : "DELETE",
            url : "/delete/"+id,
            }).done(function(){
            $(this).closest('tr').remove()  
        })
    })




   //Buton Get students list
   $('.btn-list').on('click', function(){
        $.get('/students', addStudent);
        console.log("been fired")
    })

 
     //Buton de submit
    $('#btn-list').on('click', function(e){
        e.preventDefault();
       let form = $('#contact-form');
       let form_data = form.serialize();

       $.ajax({
           'url' : '/students',
           'method' : 'post',
           'data' : form_data,
           success: (response) => {
               let new_student_name = $('#first_name').val();
                $('body').append(`<h1>Added ${new_student_name}</h1>`);
                $.get('/students', addStudent);
           }
       })
    });

    $(document).on('click', 'button.update', function() {
        let student_id = $(this).data('id');
        $.get('/students/' + student_id,  function (response) {
                console.log(response);
                $('#update_student').remove();
                $('body').append(`
                <form id="update_student">
                <input type='hidden' name="id" value="${response[0].id}">
                <label for="studentFname">First Name</label>
                <input type="text" name="fname" value="${response[0].firstName}">
                <label for="studentLname">Last Name</label>
                <input type="text" name="lname" value="${response[0].lastName}">
                <label for="studentGrade">Grade</label>
                <input type="text" name="grade" value="${response[0].grade}">
                <button id="update_action" type="submit" value="submit">Update student</button>
                </form>
                `);
            });
    });

    $(document).on('click', '#update_action', function (e) {
        e.preventDefault();
        let form_data = $('#update_student').serialize();
        let id = $('#update_student input[type="hidden"]').val();
        $.ajax({
            url : '/update/' + id,
            type: 'PUT',
            data  : form_data,
            success : function (response) {
                $.get('/students', addStudent);
            }
        });
    })
});