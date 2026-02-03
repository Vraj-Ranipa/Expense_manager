async function main() {
    try {
        console.log('Fetching seed API...');
        const res = await fetch('http://localhost:3001/api/seed');
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Response:', text);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}
main();
