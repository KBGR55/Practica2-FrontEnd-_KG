const Footer = () => {
    const footerStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.05)"
    };
    return (
        <footer class="text-center text-lg-start bg-light text-muted">
            <div class="text-center p-4" style={footerStyle}>
                © 2023 Copyright:
                <a class="text-reset fw-bold" href="https://github.com/KBGR55"> K.G</a>
            </div>
        </footer>
    );
}

export default Footer;