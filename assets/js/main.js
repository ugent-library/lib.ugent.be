document.addEventListener("DOMContentLoaded", () => {
    const dayFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    });
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h24',
    });

    const daysInFuture = function(t) {
        const today = new Date();
        return (
            Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) -
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
        ) / 86400000;
    }

    document.querySelectorAll('[data-library-open]').forEach(el => {
        fetch(el.dataset.url)
            .then(res => res.json())
            .then(out => {
                if (out.is_open == 1) {
                    const t = new Date(out.closes_at);
                    el.innerHTML = `now open until ${timeFormatter.format(t)}`;
                } else if (out.opens_at) {
                    const t = new Date(out.opens_at);
                    const days = daysInFuture(t);
                    if (days == 1) {
                        el.innerHTML = `reopens tomorrow at ${timeFormatter.format(t)}`;
                    } else if (days < 7) {
                        el.innerHTML = `reopens ${dayFormatter.format(t)} at ${timeFormatter.format(t)}`;
                    } else {
                        el.innerHTML = `reopens ${dateFormatter.format(t)} at ${timeFormatter.format(t)}`;
                    }
                } else {
                    el.innerHTML = `closed`;
                }
            })
            .catch(err => console.log(err));
    });
});
