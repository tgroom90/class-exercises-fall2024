const rootURL = "http://localhost:8000";

// React Task 1:
export async function fetchUser(username) {
    // replace this code with functionality that actually
    // queries that correct endpoint:
    const response = await fetch(`${rootURL}/api/users/${username}`);
    const user = await response.json();
    console.log(user);
    return user;
}

// React Task 3:
export async function fetchCourses(options = {}) {
    console.log(options);
    /*

classifications: ["fys", "di", "dir", "arts", "honors", "service"] (6)

days: ["M", "W"] (2)

department: undefined

hours: undefined

instructor: undefined

open: true

title: "Sample"
    */
    let baseURL = `${rootURL}/api/courses?`;
    if (options.department) {
        baseURL += `department=${options.department}&`;
    }
    if (options.instructor) {
        baseURL += `instructor=${options.instructor}&`;
    }
    if (options.hours) {
        baseURL += `hours=${options.hours}&`;
    }
    if (options.title) {
        baseURL += `title=${options.title}&`;
    }
    if (options.classifications && options.classifications.includes("di")) {
        baseURL += `is_di=true&`;
    }
    if (options.open === true) {
        baseURL += `is_open=true&`;
    }
    if (options.days) {
        baseURL += `days=${options.days}&`;
    }
    baseURL = baseURL.endsWith('&') ? baseURL.slice(0, -1) : baseURL;
    console.log(baseURL);
    const response = await fetch(baseURL);
    const courses = await response.json();
    console.log(courses);
    return courses;
}

export async function fetchSchedule(username) {
    const response = await fetch(`${rootURL}/api/schedules/${username}`);
    return await response.json();
}

export async function deleteCourseFromSchedule(schedule, crn) {
    const url = `${rootURL}/api/schedules/${schedule.id}/courses/${crn}`;
    const response = await fetch(url, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export async function addCourseToSchedule(schedule, crn) {
    console.log(crn);
    const url = `${rootURL}/api/schedules/${schedule.id}/courses`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            crn: crn,
        }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}
