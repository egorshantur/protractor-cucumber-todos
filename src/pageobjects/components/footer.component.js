class Footer {
        get footer() { return $(".info") }

        getFooterLinkByText = async (text) => {
                const linkElement = this.footer.element(by.linkText(text));
                const href = await linkElement.getAttribute('href');

                return href;
        }
}

module.exports = Footer;