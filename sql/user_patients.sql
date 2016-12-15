SELECT "username", "firstName", "lastName", "email","pFirstname", "pLastname", "pAge", "pGender", "pEmail", "pAddress"
	FROM public.users
    INNER JOIN public.patients ON users.id = patients.user_id WHERE users.username = $1
-- select * from users where username = $1;