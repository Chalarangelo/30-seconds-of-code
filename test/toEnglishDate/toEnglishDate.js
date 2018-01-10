module.exports = toEnglishDate = time => {
try {
return new Date(time)
.toISOString()
.split('T')[0]
.replace(/-/g, '/');
} catch (e) {}
};