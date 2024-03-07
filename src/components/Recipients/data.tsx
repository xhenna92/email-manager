export function groupEmailsByCompany(emails) {
  const emailsByCompany = {};
  emails.forEach((e) => {
    const key = e.email.split("@")[1];
    if (emailsByCompany[key]) {
      const emailsForKey = emailsByCompany[key];
      emailsForKey.push(e);
      emailsByCompany[key] = emailsForKey;
    } else {
      emailsByCompany[key] = [e];
    }
  });
  return emailsByCompany;
}

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
