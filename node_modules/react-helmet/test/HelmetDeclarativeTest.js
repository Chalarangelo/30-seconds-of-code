/* eslint max-nested-callbacks: [1, 7] */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/html-has-lang */

import React from "react";
import ReactDOM from "react-dom";
import ReactServer from "react-dom/server";
import {Helmet} from "../src/Helmet";
import {HTML_TAG_MAP} from "../src/HelmetConstants";
import {requestAnimationFrame} from "../src/HelmetUtils.js";

const HELMET_ATTRIBUTE = "data-react-helmet";

describe("Helmet - Declarative API", () => {
    let headElement;

    const container = document.createElement("div");

    beforeEach(() => {
        headElement =
            headElement || document.head || document.querySelector("head");

        // resets DOM after each run
        headElement.innerHTML = "";
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
    });

    describe("api", () => {
        describe("title", () => {
            it("updates page title", done => {
                ReactDOM.render(
                    <Helmet defaultTitle={"Fallback"}>
                        <title>Test Title</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Test Title");

                    done();
                });
            });

            it("updates page title and allows children containing expressions", done => {
                const someValue = "Some Great Title";

                ReactDOM.render(
                    <Helmet>
                        <title>Title: {someValue}</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Title: Some Great Title");

                    done();
                });
            });

            it("updates page title with multiple children", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <title>Test Title</title>
                        </Helmet>
                        <Helmet>
                            <title>Child One Title</title>
                        </Helmet>
                        <Helmet>
                            <title>Child Two Title</title>
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Child Two Title");

                    done();
                });
            });

            it("sets title based on deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <title>Main Title</title>
                        </Helmet>
                        <Helmet>
                            <title>Nested Title</title>
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Nested Title");

                    done();
                });
            });

            it("sets title using deepest nested component with a defined title", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <title>Main Title</title>
                        </Helmet>
                        <Helmet />
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Main Title");

                    done();
                });
            });

            it("uses defaultTitle if no title is defined", done => {
                ReactDOM.render(
                    <Helmet
                        defaultTitle={"Fallback"}
                        titleTemplate={
                            "This is a %s of the titleTemplate feature"
                        }
                    >
                        <title />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Fallback");

                    done();
                });
            });

            it("uses a titleTemplate if defined", done => {
                ReactDOM.render(
                    <Helmet
                        defaultTitle={"Fallback"}
                        titleTemplate={
                            "This is a %s of the titleTemplate feature"
                        }
                    >
                        <title>Test</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal(
                        "This is a Test of the titleTemplate feature"
                    );

                    done();
                });
            });

            it("replaces multiple title strings in titleTemplate", done => {
                ReactDOM.render(
                    <Helmet
                        titleTemplate={
                            "This is a %s of the titleTemplate feature. Another %s."
                        }
                    >
                        <title>Test</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal(
                        "This is a Test of the titleTemplate feature. Another Test."
                    );

                    done();
                });
            });

            it("uses a titleTemplate based on deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet
                            titleTemplate={
                                "This is a %s of the titleTemplate feature"
                            }
                        >
                            <title>Test</title>
                        </Helmet>
                        <Helmet
                            titleTemplate={
                                "A %s using nested titleTemplate attributes"
                            }
                        >
                            <title>Second Test</title>
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal(
                        "A Second Test using nested titleTemplate attributes"
                    );

                    done();
                });
            });

            it("merges deepest component title with nearest upstream titleTemplate", done => {
                ReactDOM.render(
                    <div>
                        <Helmet
                            titleTemplate={
                                "This is a %s of the titleTemplate feature"
                            }
                        >
                            <title>Test</title>
                        </Helmet>
                        <Helmet>
                            <title>Second Test</title>
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal(
                        "This is a Second Test of the titleTemplate feature"
                    );

                    done();
                });
            });

            it("renders dollar characters in a title correctly when titleTemplate present", done => {
                const dollarTitle = "te$t te$$t te$$$t te$$$$t";

                ReactDOM.render(
                    <Helmet titleTemplate={"This is a %s"}>
                        <title>{dollarTitle}</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal(
                        "This is a te$t te$$t te$$$t te$$$$t"
                    );

                    done();
                });
            });

            it("does not encode all characters with HTML character entity equivalents", done => {
                const chineseTitle = "膣膗 鍆錌雔";

                ReactDOM.render(
                    <Helmet>
                        <title>{chineseTitle}</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal(chineseTitle);

                    done();
                });
            });

            it("page title with prop itemProp", done => {
                ReactDOM.render(
                    <Helmet defaultTitle={"Fallback"}>
                        <title itemProp="name">Test Title with itemProp</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const titleTag = document.getElementsByTagName("title")[0];
                    expect(document.title).to.equal("Test Title with itemProp");
                    expect(titleTag.getAttribute("itemprop")).to.equal("name");

                    done();
                });
            });

            it("retains existing title tag when no title tag is defined", done => {
                headElement.innerHTML = `<title>Existing Title</title>`;

                ReactDOM.render(
                    <Helmet>
                        <meta name="keywords" content="stuff" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Existing Title");

                    done();
                });
            });

            it.skip("clears title tag if empty title is defined", done => {
                ReactDOM.render(
                    <Helmet>
                        <title>Existing Title</title>
                        <meta name="keywords" content="stuff" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(document.title).to.equal("Existing Title");

                    ReactDOM.render(
                        <Helmet>
                            <title>{" "}</title>
                            <meta name="keywords" content="stuff" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        expect(document.title).to.equal("");
                        done();
                    });
                });
            });
        });

        describe("title attributes", () => {
            beforeEach(() => {
                headElement.innerHTML = `<title>Test Title</title>`;
            });

            it("updates title attributes", done => {
                ReactDOM.render(
                    <Helmet>
                        <title itemProp="name" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const titleTag = document.getElementsByTagName("title")[0];

                    expect(titleTag.getAttribute("itemprop")).to.equal("name");
                    expect(titleTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "itemprop"
                    );

                    done();
                });
            });

            it("sets attributes based on the deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <title lang="en" hidden />
                        </Helmet>
                        <Helmet>
                            <title lang="ja" />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const titleTag = document.getElementsByTagName("title")[0];

                    expect(titleTag.getAttribute("lang")).to.equal("ja");
                    expect(titleTag.getAttribute("hidden")).to.equal("true");
                    expect(titleTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "lang,hidden"
                    );

                    done();
                });
            });

            it("handles valueless attributes", done => {
                ReactDOM.render(
                    <Helmet>
                        <title hidden />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const titleTag = document.getElementsByTagName("title")[0];

                    expect(titleTag.getAttribute("hidden")).to.equal("true");
                    expect(titleTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "hidden"
                    );

                    done();
                });
            });

            it("clears title attributes that are handled within helmet", done => {
                ReactDOM.render(
                    <Helmet>
                        <title lang="en" hidden />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const titleTag = document.getElementsByTagName(
                            "title"
                        )[0];

                        expect(titleTag.getAttribute("lang")).to.be.null;
                        expect(titleTag.getAttribute("hidden")).to.be.null;
                        expect(
                            titleTag.getAttribute(HELMET_ATTRIBUTE)
                        ).to.equal(null);

                        done();
                    });
                });
            });
        });

        describe("html attributes", () => {
            it("updates html attributes", done => {
                ReactDOM.render(
                    <Helmet>
                        <html className="myClassName" lang="en" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const htmlTag = document.getElementsByTagName("html")[0];

                    expect(htmlTag.getAttribute("class")).to.equal(
                        "myClassName"
                    );
                    expect(htmlTag.getAttribute("lang")).to.equal("en");
                    expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "class,lang"
                    );

                    done();
                });
            });

            it("sets attributes based on the deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <html lang="en" />
                        </Helmet>
                        <Helmet>
                            <html lang="ja" />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const htmlTag = document.getElementsByTagName("html")[0];

                    expect(htmlTag.getAttribute("lang")).to.equal("ja");
                    expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "lang"
                    );

                    done();
                });
            });

            it("handles valueless attributes", done => {
                ReactDOM.render(
                    <Helmet>
                        <html amp />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const htmlTag = document.getElementsByTagName("html")[0];

                    expect(htmlTag.getAttribute("amp")).to.equal("true");
                    expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "amp"
                    );

                    done();
                });
            });

            it("clears html attributes that are handled within helmet", done => {
                ReactDOM.render(
                    <Helmet>
                        <html lang="en" amp />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const htmlTag = document.getElementsByTagName(
                            "html"
                        )[0];

                        expect(htmlTag.getAttribute("lang")).to.be.null;
                        expect(htmlTag.getAttribute("amp")).to.be.null;
                        expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            null
                        );

                        done();
                    });
                });
            });

            it("updates with multiple additions and removals - overwrite and new", done => {
                ReactDOM.render(
                    <Helmet>
                        <html lang="en" amp />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(
                        <Helmet>
                            <html lang="ja" id="html-tag" title="html tag" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        const htmlTag = document.getElementsByTagName(
                            "html"
                        )[0];

                        expect(htmlTag.getAttribute("amp")).to.equal(null);
                        expect(htmlTag.getAttribute("lang")).to.equal("ja");
                        expect(htmlTag.getAttribute("id")).to.equal("html-tag");
                        expect(htmlTag.getAttribute("title")).to.equal(
                            "html tag"
                        );
                        expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            "lang,id,title"
                        );

                        done();
                    });
                });
            });

            it("updates with multiple additions and removals - all new", done => {
                ReactDOM.render(
                    <Helmet>
                        <html lang="en" amp />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(
                        <Helmet>
                            <html id="html-tag" title="html tag" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        const htmlTag = document.getElementsByTagName(
                            "html"
                        )[0];

                        expect(htmlTag.getAttribute("amp")).to.equal(null);
                        expect(htmlTag.getAttribute("lang")).to.equal(null);
                        expect(htmlTag.getAttribute("id")).to.equal("html-tag");
                        expect(htmlTag.getAttribute("title")).to.equal(
                            "html tag"
                        );
                        expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            "id,title"
                        );

                        done();
                    });
                });
            });

            context("initialized outside of helmet", () => {
                before(() => {
                    const htmlTag = document.getElementsByTagName("html")[0];
                    htmlTag.setAttribute("test", "test");
                });

                it("are not cleared", done => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const htmlTag = document.getElementsByTagName(
                            "html"
                        )[0];

                        expect(htmlTag.getAttribute("test")).to.equal("test");
                        expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            null
                        );

                        done();
                    });
                });

                it("overwritten if specified in helmet", done => {
                    ReactDOM.render(
                        <Helmet>
                            <html test="helmet-attr" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        const htmlTag = document.getElementsByTagName(
                            "html"
                        )[0];

                        expect(htmlTag.getAttribute("test")).to.equal(
                            "helmet-attr"
                        );
                        expect(htmlTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            "test"
                        );

                        done();
                    });
                });

                it("cleared once it is managed in helmet", done => {
                    ReactDOM.render(
                        <Helmet>
                            <html test="helmet-attr" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        ReactDOM.render(<Helmet />, container);

                        requestAnimationFrame(() => {
                            const htmlTag = document.getElementsByTagName(
                                "html"
                            )[0];

                            expect(htmlTag.getAttribute("test")).to.equal(null);
                            expect(
                                htmlTag.getAttribute(HELMET_ATTRIBUTE)
                            ).to.equal(null);

                            done();
                        });
                    });
                });
            });
        });

        describe("body attributes", () => {
            context("valid attributes", () => {
                const attributeList = {
                    accessKey: "c",
                    className: "test",
                    contentEditable: "true",
                    contextMenu: "mymenu",
                    "data-animal-type": "lion",
                    dir: "rtl",
                    draggable: "true",
                    dropzone: "copy",
                    hidden: "true",
                    id: "test",
                    lang: "fr",
                    spellcheck: "true",
                    style: "color:green",
                    tabIndex: "-1",
                    title: "test",
                    translate: "no"
                };

                Object.keys(attributeList).forEach(attribute => {
                    it(attribute, done => {
                        const attrValue = attributeList[attribute];

                        const attr = {
                            [attribute]: attrValue
                        };

                        ReactDOM.render(
                            <Helmet>
                                <body {...attr} />
                            </Helmet>,
                            container
                        );

                        requestAnimationFrame(() => {
                            const bodyTag = document.body;

                            const reactCompatAttr =
                                HTML_TAG_MAP[attribute] || attribute;
                            expect(
                                bodyTag.getAttribute(reactCompatAttr)
                            ).to.equal(attrValue);
                            expect(
                                bodyTag.getAttribute(HELMET_ATTRIBUTE)
                            ).to.equal(reactCompatAttr);

                            done();
                        });
                    });
                });
            });

            it("updates multiple body attributes", done => {
                ReactDOM.render(
                    <Helmet>
                        <body className="myClassName" tabIndex={-1} />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const bodyTag = document.body;

                    expect(bodyTag.getAttribute("class")).to.equal(
                        "myClassName"
                    );
                    expect(bodyTag.getAttribute("tabindex")).to.equal("-1");
                    expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "class,tabindex"
                    );

                    done();
                });
            });

            it("sets attributes based on the deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <body lang="en" />
                        </Helmet>
                        <Helmet>
                            <body lang="ja" />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const bodyTag = document.body;

                    expect(bodyTag.getAttribute("lang")).to.equal("ja");
                    expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "lang"
                    );

                    done();
                });
            });

            it("handles valueless attributes", done => {
                ReactDOM.render(
                    <Helmet>
                        <body hidden />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const bodyTag = document.body;

                    expect(bodyTag.getAttribute("hidden")).to.equal("true");
                    expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                        "hidden"
                    );

                    done();
                });
            });

            it("clears body attributes that are handled within helmet", done => {
                ReactDOM.render(
                    <Helmet>
                        <body lang="en" hidden />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const bodyTag = document.body;

                        expect(bodyTag.getAttribute("lang")).to.be.null;
                        expect(bodyTag.getAttribute("hidden")).to.be.null;
                        expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            null
                        );

                        done();
                    });
                });
            });

            it("updates with multiple additions and removals - overwrite and new", done => {
                ReactDOM.render(
                    <Helmet>
                        <body lang="en" hidden />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(
                        <Helmet>
                            <body lang="ja" id="body-tag" title="body tag" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        const bodyTag = document.body;

                        expect(bodyTag.getAttribute("hidden")).to.equal(null);
                        expect(bodyTag.getAttribute("lang")).to.equal("ja");
                        expect(bodyTag.getAttribute("id")).to.equal("body-tag");
                        expect(bodyTag.getAttribute("title")).to.equal(
                            "body tag"
                        );
                        expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            "lang,id,title"
                        );

                        done();
                    });
                });
            });

            it("updates with multiple additions and removals - all new", done => {
                ReactDOM.render(
                    <Helmet>
                        <body lang="en" hidden />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(
                        <Helmet>
                            <body id="body-tag" title="body tag" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        const bodyTag = document.body;

                        expect(bodyTag.getAttribute("hidden")).to.equal(null);
                        expect(bodyTag.getAttribute("lang")).to.equal(null);
                        expect(bodyTag.getAttribute("id")).to.equal("body-tag");
                        expect(bodyTag.getAttribute("title")).to.equal(
                            "body tag"
                        );
                        expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            "id,title"
                        );

                        done();
                    });
                });
            });

            context("initialized outside of helmet", () => {
                before(() => {
                    const bodyTag = document.body;
                    bodyTag.setAttribute("test", "test");
                });

                it("attributes are not cleared", done => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const bodyTag = document.body;

                        expect(bodyTag.getAttribute("test")).to.equal("test");
                        expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            null
                        );

                        done();
                    });
                });

                it("attributes are overwritten if specified in helmet", done => {
                    ReactDOM.render(
                        <Helmet>
                            <body test="helmet-attr" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        const bodyTag = document.body;

                        expect(bodyTag.getAttribute("test")).to.equal(
                            "helmet-attr"
                        );
                        expect(bodyTag.getAttribute(HELMET_ATTRIBUTE)).to.equal(
                            "test"
                        );

                        done();
                    });
                });

                it("attributes are cleared once managed in helmet", done => {
                    ReactDOM.render(
                        <Helmet>
                            <body test="helmet-attr" />
                        </Helmet>,
                        container
                    );

                    requestAnimationFrame(() => {
                        ReactDOM.render(<Helmet />, container);

                        requestAnimationFrame(() => {
                            const bodyTag = document.body;

                            expect(bodyTag.getAttribute("test")).to.equal(null);
                            expect(
                                bodyTag.getAttribute(HELMET_ATTRIBUTE)
                            ).to.equal(null);

                            done();
                        });
                    });
                });
            });
        });

        describe("onChangeClientState", () => {
            it("when handling client state change, calls the function with new state, addedTags and removedTags ", done => {
                const spy = sinon.spy();
                ReactDOM.render(
                    <div>
                        <Helmet onChangeClientState={spy}>
                            <base href="http://mysite.com/" />
                            <link
                                href="http://localhost/helmet"
                                rel="canonical"
                            />
                            <meta charSet="utf-8" />
                            <script
                                src="http://localhost/test.js"
                                type="text/javascript"
                            />
                            <title>Main Title</title>
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(spy.called).to.equal(true);
                    const newState = spy.getCall(0).args[0];
                    const addedTags = spy.getCall(0).args[1];
                    const removedTags = spy.getCall(0).args[2];

                    expect(newState).to.contain({title: "Main Title"});
                    expect(newState.baseTag).to.contain({
                        href: "http://mysite.com/"
                    });
                    expect(newState.metaTags).to.contain({charset: "utf-8"});
                    expect(newState.linkTags).to.contain({
                        href: "http://localhost/helmet",
                        rel: "canonical"
                    });
                    expect(newState.scriptTags).to.contain({
                        src: "http://localhost/test.js",
                        type: "text/javascript"
                    });

                    expect(addedTags).to.have.property("baseTag");
                    expect(addedTags.baseTag).to.have.deep.property("[0]");
                    expect(addedTags.baseTag[0].outerHTML).to.equal(
                        `<base href="http://mysite.com/" data-react-helmet="true">`
                    );

                    expect(addedTags).to.have.property("metaTags");
                    expect(addedTags.metaTags).to.have.deep.property("[0]");
                    expect(addedTags.metaTags[0].outerHTML).to.equal(
                        `<meta charset="utf-8" data-react-helmet="true">`
                    );

                    expect(addedTags).to.have.property("linkTags");
                    expect(addedTags.linkTags).to.have.deep.property("[0]");
                    expect(addedTags.linkTags[0].outerHTML).to.equal(
                        `<link href="http://localhost/helmet" rel="canonical" data-react-helmet="true">`
                    );

                    expect(addedTags).to.have.property("scriptTags");
                    expect(addedTags.scriptTags).to.have.deep.property("[0]");
                    expect(addedTags.scriptTags[0].outerHTML).to.equal(
                        `<script src="http://localhost/test.js" type="text/javascript" data-react-helmet="true"></script>`
                    );

                    expect(removedTags).to.be.empty;

                    done();
                });
            });

            it("calls the deepest defined callback with the deepest state", done => {
                const spy = sinon.spy();
                ReactDOM.render(
                    <div>
                        <Helmet onChangeClientState={spy}>
                            <title>Main Title</title>
                        </Helmet>
                        <Helmet>
                            <title>Deeper Title</title>
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(spy.callCount).to.equal(1);
                    expect(spy.getCall(0).args[0]).to.contain({
                        title: "Deeper Title"
                    });

                    done();
                });
            });
        });

        describe("base tag", () => {
            it("updates base tag", done => {
                ReactDOM.render(
                    <Helmet>
                        <base href="http://mysite.com/" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `base[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTags).to.not.equal(undefined);

                    const filteredTags = [].slice
                        .call(existingTags)
                        .filter(tag => {
                            return (
                                tag.getAttribute("href") ===
                                "http://mysite.com/"
                            );
                        });

                    expect(filteredTags.length).to.equal(1);

                    done();
                });
            });

            it("clears the base tag if one is not specified", done => {
                ReactDOM.render(
                    <Helmet base={{href: "http://mysite.com/"}} />,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const existingTags = headElement.querySelectorAll(
                            `base[${HELMET_ATTRIBUTE}]`
                        );

                        expect(existingTags).to.not.equal(undefined);
                        expect(existingTags.length).to.equal(0);

                        done();
                    });
                });
            });

            it("tags without 'href' are not accepted", done => {
                ReactDOM.render(
                    <Helmet>
                        <base property="won't work" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `base[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(0);

                    done();
                });
            });

            it("sets base tag based on deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <base href="http://mysite.com" />
                        </Helmet>
                        <Helmet>
                            <base href="http://mysite.com/public" />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `base[${HELMET_ATTRIBUTE}]`
                    );
                    const firstTag = Array.prototype.slice.call(
                        existingTags
                    )[0];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.equal(1);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://mysite.com/public"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<base href="http://mysite.com/public" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("does not render tag when primary attribute is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <base href={undefined} />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `base[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    expect(existingTags).to.be.empty;

                    done();
                });
            });
        });

        describe("meta tags", () => {
            it("updates meta tags", done => {
                ReactDOM.render(
                    <Helmet>
                        <meta charSet="utf-8" />
                        <meta name="description" content="Test description" />
                        <meta httpEquiv="content-type" content="text/html" />
                        <meta property="og:type" content="article" />
                        <meta itemProp="name" content="Test name itemprop" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);

                    expect(existingTags).to.not.equal(undefined);

                    const filteredTags = [].slice
                        .call(existingTags)
                        .filter(tag => {
                            return (
                                tag.getAttribute("charset") === "utf-8" ||
                                (tag.getAttribute("name") === "description" &&
                                    tag.getAttribute("content") ===
                                        "Test description") ||
                                (tag.getAttribute("http-equiv") ===
                                    "content-type" &&
                                    tag.getAttribute("content") ===
                                        "text/html") ||
                                (tag.getAttribute("itemprop") === "name" &&
                                    tag.getAttribute("content") ===
                                        "Test name itemprop")
                            );
                        });

                    expect(filteredTags.length).to.be.at.least(4);

                    done();
                });
            });

            it("clears all meta tags if none are specified", done => {
                ReactDOM.render(
                    <Helmet>
                        <meta name="description" content="Test description" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const existingTags = headElement.querySelectorAll(
                            `meta[${HELMET_ATTRIBUTE}]`
                        );

                        expect(existingTags).to.not.equal(undefined);
                        expect(existingTags.length).to.equal(0);

                        done();
                    });
                });
            });

            it("tags without 'name', 'http-equiv', 'property', 'charset', or 'itemprop' are not accepted", done => {
                ReactDOM.render(
                    <Helmet>
                        <meta href="won't work" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(0);

                    done();
                });
            });

            it("sets meta tags based on deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <meta
                                name="description"
                                content="Test description"
                            />
                        </Helmet>
                        <Helmet>
                            <meta
                                name="description"
                                content="Inner description"
                            />
                            <meta name="keywords" content="test,meta,tags" />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);

                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];
                    const thirdTag = existingTags[2];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.equal(3);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("charset")).to.equal("utf-8");
                    expect(firstTag.outerHTML).to.equal(
                        `<meta charset="utf-8" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("name")).to.equal(
                        "description"
                    );
                    expect(secondTag.getAttribute("content")).to.equal(
                        "Inner description"
                    );
                    expect(secondTag.outerHTML).to.equal(
                        `<meta name="description" content="Inner description" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[2]")
                        .that.is.an.instanceof(Element);
                    expect(thirdTag).to.have.property("getAttribute");
                    expect(thirdTag.getAttribute("name")).to.equal("keywords");
                    expect(thirdTag.getAttribute("content")).to.equal(
                        "test,meta,tags"
                    );
                    expect(thirdTag.outerHTML).to.equal(
                        `<meta name="keywords" content="test,meta,tags" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("allows duplicate meta tags if specified in the same component", done => {
                ReactDOM.render(
                    <Helmet>
                        <meta name="description" content="Test description" />
                        <meta
                            name="description"
                            content="Duplicate description"
                        />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.equal(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("name")).to.equal(
                        "description"
                    );
                    expect(firstTag.getAttribute("content")).to.equal(
                        "Test description"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<meta name="description" content="Test description" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("name")).to.equal(
                        "description"
                    );
                    expect(secondTag.getAttribute("content")).to.equal(
                        "Duplicate description"
                    );
                    expect(secondTag.outerHTML).to.equal(
                        `<meta name="description" content="Duplicate description" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("overrides duplicate meta tags with single meta tag in a nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <meta
                                name="description"
                                content="Test description"
                            />
                            <meta
                                name="description"
                                content="Duplicate description"
                            />
                        </Helmet>
                        <Helmet>
                            <meta
                                name="description"
                                content="Inner description"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.equal(1);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("name")).to.equal(
                        "description"
                    );
                    expect(firstTag.getAttribute("content")).to.equal(
                        "Inner description"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<meta name="description" content="Inner description" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("overrides single meta tag with duplicate meta tags in a nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <meta
                                name="description"
                                content="Test description"
                            />
                        </Helmet>
                        <Helmet>
                            <meta
                                name="description"
                                content="Inner description"
                            />
                            <meta
                                name="description"
                                content="Inner duplicate description"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.equal(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("name")).to.equal(
                        "description"
                    );
                    expect(firstTag.getAttribute("content")).to.equal(
                        "Inner description"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<meta name="description" content="Inner description" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("name")).to.equal(
                        "description"
                    );
                    expect(secondTag.getAttribute("content")).to.equal(
                        "Inner duplicate description"
                    );
                    expect(secondTag.outerHTML).to.equal(
                        `<meta name="description" content="Inner duplicate description" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("does not render tag when primary attribute is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <meta
                            name={undefined}
                            content="Inner duplicate description"
                        />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `meta[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    expect(existingTags).to.be.empty;

                    done();
                });
            });
        });

        describe("link tags", () => {
            it("updates link tags", done => {
                ReactDOM.render(
                    <Helmet>
                        <link href="http://localhost/helmet" rel="canonical" />
                        <link
                            href="http://localhost/style.css"
                            rel="stylesheet"
                            type="text/css"
                        />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);

                    expect(existingTags).to.not.equal(undefined);

                    const filteredTags = [].slice
                        .call(existingTags)
                        .filter(tag => {
                            return (
                                (tag.getAttribute("href") ===
                                    "http://localhost/style.css" &&
                                    tag.getAttribute("rel") === "stylesheet" &&
                                    tag.getAttribute("type") === "text/css") ||
                                (tag.getAttribute("href") ===
                                    "http://localhost/helmet" &&
                                    tag.getAttribute("rel") === "canonical")
                            );
                        });

                    expect(filteredTags.length).to.be.at.least(2);

                    done();
                });
            });

            it("clears all link tags if none are specified", done => {
                ReactDOM.render(
                    <Helmet>
                        <link href="http://localhost/helmet" rel="canonical" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const tagNodes = headElement.querySelectorAll(
                            `link[${HELMET_ATTRIBUTE}]`
                        );
                        const existingTags = Array.prototype.slice.call(
                            tagNodes
                        );

                        expect(existingTags).to.not.equal(undefined);
                        expect(existingTags.length).to.equal(0);

                        done();
                    });
                });
            });

            it("tags without 'href' or 'rel' are not accepted, even if they are valid for other tags", done => {
                ReactDOM.render(
                    <Helmet>
                        <link httpEquiv="won't work" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(0);

                    done();
                });
            });

            it("tags 'rel' and 'href' properly use 'rel' as the primary identification for this tag, regardless of ordering", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <link
                                href="http://localhost/helmet"
                                rel="canonical"
                            />
                        </Helmet>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet/new"
                            />
                        </Helmet>
                        <Helmet>
                            <link
                                href="http://localhost/helmet/newest"
                                rel="canonical"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.equal(1);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("rel")).to.equal("canonical");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/newest"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<link href="http://localhost/helmet/newest" rel="canonical" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("tags with rel='stylesheet' uses the href as the primary identification of the tag, regardless of ordering", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <link
                                href="http://localhost/style.css"
                                rel="stylesheet"
                                type="text/css"
                                media="all"
                            />
                        </Helmet>
                        <Helmet>
                            <link
                                rel="stylesheet"
                                href="http://localhost/inner.css"
                                type="text/css"
                                media="all"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.equal(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/style.css"
                    );
                    expect(firstTag.getAttribute("rel")).to.equal("stylesheet");
                    expect(firstTag.getAttribute("type")).to.equal("text/css");
                    expect(firstTag.getAttribute("media")).to.equal("all");
                    expect(firstTag.outerHTML).to.equal(
                        `<link href="http://localhost/style.css" rel="stylesheet" type="text/css" media="all" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("rel")).to.equal(
                        "stylesheet"
                    );
                    expect(secondTag.getAttribute("href")).to.equal(
                        "http://localhost/inner.css"
                    );
                    expect(secondTag.getAttribute("type")).to.equal("text/css");
                    expect(secondTag.getAttribute("media")).to.equal("all");
                    expect(secondTag.outerHTML).to.equal(
                        `<link rel="stylesheet" href="http://localhost/inner.css" type="text/css" media="all" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("sets link tags based on deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet"
                            />
                            <link
                                href="http://localhost/style.css"
                                rel="stylesheet"
                                type="text/css"
                                media="all"
                            />
                        </Helmet>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet/innercomponent"
                            />
                            <link
                                href="http://localhost/inner.css"
                                rel="stylesheet"
                                type="text/css"
                                media="all"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];
                    const thirdTag = existingTags[2];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.at.least(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/style.css"
                    );
                    expect(firstTag.getAttribute("rel")).to.equal("stylesheet");
                    expect(firstTag.getAttribute("type")).to.equal("text/css");
                    expect(firstTag.getAttribute("media")).to.equal("all");
                    expect(firstTag.outerHTML).to.equal(
                        `<link href="http://localhost/style.css" rel="stylesheet" type="text/css" media="all" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/innercomponent"
                    );
                    expect(secondTag.getAttribute("rel")).to.equal("canonical");
                    expect(secondTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet/innercomponent" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[2]")
                        .that.is.an.instanceof(Element);
                    expect(thirdTag).to.have.property("getAttribute");
                    expect(thirdTag.getAttribute("href")).to.equal(
                        "http://localhost/inner.css"
                    );
                    expect(thirdTag.getAttribute("rel")).to.equal("stylesheet");
                    expect(thirdTag.getAttribute("type")).to.equal("text/css");
                    expect(thirdTag.getAttribute("media")).to.equal("all");
                    expect(thirdTag.outerHTML).to.equal(
                        `<link href="http://localhost/inner.css" rel="stylesheet" type="text/css" media="all" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("allows duplicate link tags if specified in the same component", done => {
                ReactDOM.render(
                    <Helmet>
                        <link rel="canonical" href="http://localhost/helmet" />
                        <link
                            rel="canonical"
                            href="http://localhost/helmet/component"
                        />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.at.least(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("rel")).to.equal("canonical");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("rel")).to.equal("canonical");
                    expect(secondTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/component"
                    );
                    expect(secondTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet/component" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("overrides duplicate link tags with a single link tag in a nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet"
                            />
                            <link
                                rel="canonical"
                                href="http://localhost/helmet/component"
                            />
                        </Helmet>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet/innercomponent"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.equal(1);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("rel")).to.equal("canonical");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/innercomponent"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet/innercomponent" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("overrides single link tag with duplicate link tags in a nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet"
                            />
                        </Helmet>
                        <Helmet>
                            <link
                                rel="canonical"
                                href="http://localhost/helmet/component"
                            />
                            <link
                                rel="canonical"
                                href="http://localhost/helmet/innercomponent"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.equal(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("rel")).to.equal("canonical");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/component"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet/component" ${HELMET_ATTRIBUTE}="true">`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("rel")).to.equal("canonical");
                    expect(secondTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/innercomponent"
                    );
                    expect(secondTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet/innercomponent" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });

            it("does not render tag when primary attribute is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <link rel="icon" sizes="192x192" href={null} />
                        <link
                            rel="canonical"
                            href="http://localhost/helmet/component"
                        />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `link[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.be.equal(1);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("rel")).to.equal("canonical");
                    expect(firstTag.getAttribute("href")).to.equal(
                        "http://localhost/helmet/component"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<link rel="canonical" href="http://localhost/helmet/component" ${HELMET_ATTRIBUTE}="true">`
                    );

                    done();
                });
            });
        });

        describe("script tags", () => {
            it("updates script tags", done => {
                const scriptInnerHTML = `
                  {
                    "@context": "http://schema.org",
                    "@type": "NewsArticle",
                    "url": "http://localhost/helmet"
                  }
                `;
                ReactDOM.render(
                    <Helmet>
                        <script
                            src="http://localhost/test.js"
                            type="text/javascript"
                        />
                        <script
                            src="http://localhost/test2.js"
                            type="text/javascript"
                        />
                        <script type="application/ld+json">
                            {scriptInnerHTML}
                        </script>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.getElementsByTagName(
                        "script"
                    );

                    expect(existingTags).to.not.equal(undefined);

                    const filteredTags = [].slice
                        .call(existingTags)
                        .filter(tag => {
                            return (
                                (tag.getAttribute("src") ===
                                    "http://localhost/test.js" &&
                                    tag.getAttribute("type") ===
                                        "text/javascript") ||
                                (tag.getAttribute("src") ===
                                    "http://localhost/test2.js" &&
                                    tag.getAttribute("type") ===
                                        "text/javascript") ||
                                (tag.getAttribute("type") ===
                                    "application/ld+json" &&
                                    tag.innerHTML === scriptInnerHTML)
                            );
                        });

                    expect(filteredTags.length).to.be.at.least(3);

                    done();
                });
            });

            it("clears all scripts tags if none are specified", done => {
                ReactDOM.render(
                    <Helmet>
                        <script
                            src="http://localhost/test.js"
                            type="text/javascript"
                        />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const existingTags = headElement.querySelectorAll(
                            `script[${HELMET_ATTRIBUTE}]`
                        );

                        expect(existingTags).to.not.equal(undefined);
                        expect(existingTags.length).to.equal(0);

                        done();
                    });
                });
            });

            it("tags without 'src' are not accepted", done => {
                ReactDOM.render(
                    <Helmet>
                        <script property="won't work" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `script[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(0);

                    done();
                });
            });

            it("sets script tags based on deepest nested component", done => {
                ReactDOM.render(
                    <div>
                        <Helmet>
                            <script
                                src="http://localhost/test.js"
                                type="text/javascript"
                            />
                            <script
                                src="http://localhost/test2.js"
                                type="text/javascript"
                            />
                        </Helmet>
                    </div>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `script[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    const firstTag = existingTags[0];
                    const secondTag = existingTags[1];

                    expect(existingTags).to.not.equal(undefined);

                    expect(existingTags.length).to.be.at.least(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("src")).to.equal(
                        "http://localhost/test.js"
                    );
                    expect(firstTag.getAttribute("type")).to.equal(
                        "text/javascript"
                    );
                    expect(firstTag.outerHTML).to.equal(
                        `<script src="http://localhost/test.js" type="text/javascript" ${HELMET_ATTRIBUTE}="true"></script>`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag).to.have.property("getAttribute");
                    expect(secondTag.getAttribute("src")).to.equal(
                        "http://localhost/test2.js"
                    );
                    expect(secondTag.getAttribute("type")).to.equal(
                        "text/javascript"
                    );
                    expect(secondTag.outerHTML).to.equal(
                        `<script src="http://localhost/test2.js" type="text/javascript" ${HELMET_ATTRIBUTE}="true"></script>`
                    );

                    done();
                });
            });

            it("sets undefined attribute values to empty strings", done => {
                ReactDOM.render(
                    <Helmet>
                        <script src="foo.js" async={undefined} />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTag = headElement.querySelector(
                        `script[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTag).to.not.equal(undefined);
                    expect(existingTag.outerHTML).to.be
                        .a("string")
                        .that.equals(
                            `<script src="foo.js" async="" ${HELMET_ATTRIBUTE}="true"></script>`
                        );

                    done();
                });
            });

            it("does not render tag when primary attribute (src) is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <script src={undefined} type="text/javascript" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `script[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    expect(existingTags).to.be.empty;

                    done();
                });
            });

            it("does not render tag when primary attribute (innerHTML) is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <script innerHTML={undefined} />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `script[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    expect(existingTags).to.be.empty;

                    done();
                });
            });
        });

        describe("noscript tags", () => {
            it("updates noscript tags", done => {
                const noscriptInnerHTML = `<link rel="stylesheet" type="text/css" href="foo.css" />`;
                ReactDOM.render(
                    <Helmet>
                        <noscript id="bar">{noscriptInnerHTML}</noscript>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.getElementsByTagName(
                        "noscript"
                    );

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(1);
                    expect(
                        existingTags[0].innerHTML === noscriptInnerHTML &&
                            existingTags[0].id === "bar"
                    );

                    done();
                });
            });

            it("clears all noscripts tags if none are specified", done => {
                ReactDOM.render(
                    <Helmet>
                        <noscript id="bar" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const existingTags = headElement.querySelectorAll(
                            `script[${HELMET_ATTRIBUTE}]`
                        );

                        expect(existingTags).to.not.equal(undefined);
                        expect(existingTags.length).to.equal(0);

                        done();
                    });
                });
            });

            it("tags without 'innerHTML' are not accepted", done => {
                ReactDOM.render(
                    <Helmet>
                        <noscript property="won't work" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `noscript[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(0);

                    done();
                });
            });

            it("does not render tag when primary attribute is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <noscript>{undefined}</noscript>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `noscript[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    expect(existingTags).to.be.empty;

                    done();
                });
            });
        });

        describe("style tags", () => {
            it("updates style tags", done => {
                const cssText1 = `
                    body {
                        background-color: green;
                    }
                `;
                const cssText2 = `
                    p {
                        font-size: 12px;
                    }
                `;

                ReactDOM.render(
                    <Helmet>
                        <style type="text/css">{cssText1}</style>
                        <style>{cssText2}</style>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `style[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);

                    const [firstTag, secondTag] = existingTags;
                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.be.equal(2);

                    expect(existingTags).to.have.deep
                        .property("[0]")
                        .that.is.an.instanceof(Element);
                    expect(firstTag).to.have.property("getAttribute");
                    expect(firstTag.getAttribute("type")).to.equal("text/css");
                    expect(firstTag.innerHTML).to.equal(cssText1);
                    expect(firstTag.outerHTML).to.equal(
                        `<style type="text/css" ${HELMET_ATTRIBUTE}="true">${cssText1}</style>`
                    );

                    expect(existingTags).to.have.deep
                        .property("[1]")
                        .that.is.an.instanceof(Element);
                    expect(secondTag.innerHTML).to.equal(cssText2);
                    expect(secondTag.outerHTML).to.equal(
                        `<style ${HELMET_ATTRIBUTE}="true">${cssText2}</style>`
                    );

                    done();
                });
            });

            it("clears all style tags if none are specified", done => {
                const cssText = `
                    body {
                        background-color: green;
                    }
                `;
                ReactDOM.render(
                    <Helmet>
                        <style type="text/css">{cssText}</style>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    ReactDOM.render(<Helmet />, container);

                    requestAnimationFrame(() => {
                        const existingTags = headElement.querySelectorAll(
                            `style[${HELMET_ATTRIBUTE}]`
                        );

                        expect(existingTags).to.not.equal(undefined);
                        expect(existingTags.length).to.equal(0);

                        done();
                    });
                });
            });

            it("tags without 'cssText' are not accepted", done => {
                ReactDOM.render(
                    <Helmet>
                        <style property="won't work" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const existingTags = headElement.querySelectorAll(
                        `style[${HELMET_ATTRIBUTE}]`
                    );

                    expect(existingTags).to.not.equal(undefined);
                    expect(existingTags.length).to.equal(0);

                    done();
                });
            });

            it("does not render tag when primary attribute is null", done => {
                ReactDOM.render(
                    <Helmet>
                        <style>{undefined}</style>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    const tagNodes = headElement.querySelectorAll(
                        `style[${HELMET_ATTRIBUTE}]`
                    );
                    const existingTags = Array.prototype.slice.call(tagNodes);
                    expect(existingTags).to.be.empty;

                    done();
                });
            });
        });
    });

    describe("deferred tags", () => {
        beforeEach(() => {
            window.__spy__ = sinon.spy();
        });

        afterEach(() => {
            delete window.__spy__;
        });

        it("executes synchronously when defer={true} and async otherwise", done => {
            ReactDOM.render(
                <div>
                    <Helmet defer={false}>
                        <script>
                            window.__spy__(1)
                        </script>
                    </Helmet>
                    <Helmet>
                        <script>
                            window.__spy__(2)
                        </script>
                    </Helmet>
                </div>,
                container
            );

            expect(window.__spy__.callCount).to.equal(1);

            requestAnimationFrame(() => {
                expect(window.__spy__.callCount).to.equal(2);
                expect(window.__spy__.args).to.deep.equal([[1], [2]]);
                done();
            });
        });
    });

    describe("server", () => {
        const stringifiedHtmlAttributes = `lang="ga" class="myClassName"`;
        const stringifiedBodyAttributes = `lang="ga" class="myClassName"`;
        const stringifiedTitle = `<title ${HELMET_ATTRIBUTE}="true">Dangerous &lt;script&gt; include</title>`;
        const unEncodedStringifiedTitle = `<title ${HELMET_ATTRIBUTE}="true">This is text and & and '.</title>`;
        const stringifiedTitleWithItemprop = `<title ${HELMET_ATTRIBUTE}="true" itemprop="name">Title with Itemprop</title>`;
        const stringifiedTitleWithTitleExpression = `<title ${HELMET_ATTRIBUTE}="true">Title: Some Great Title</title>`;
        const stringifiedBaseTag = `<base ${HELMET_ATTRIBUTE}="true" target="_blank" href="http://localhost/"/>`;

        const stringifiedMetaTags = [
            `<meta ${HELMET_ATTRIBUTE}="true" charset="utf-8"/>`,
            `<meta ${HELMET_ATTRIBUTE}="true" name="description" content="Test description &amp; encoding of special characters like &#x27; &quot; &gt; &lt; \`"/>`,
            `<meta ${HELMET_ATTRIBUTE}="true" http-equiv="content-type" content="text/html"/>`,
            `<meta ${HELMET_ATTRIBUTE}="true" property="og:type" content="article"/>`,
            `<meta ${HELMET_ATTRIBUTE}="true" itemprop="name" content="Test name itemprop"/>`
        ].join("");

        const stringifiedLinkTags = [
            `<link ${HELMET_ATTRIBUTE}="true" href="http://localhost/helmet" rel="canonical"/>`,
            `<link ${HELMET_ATTRIBUTE}="true" href="http://localhost/style.css" rel="stylesheet" type="text/css"/>`
        ].join("");

        const stringifiedScriptTags = [
            `<script ${HELMET_ATTRIBUTE}="true" src="http://localhost/test.js" type="text/javascript"></script>`,
            `<script ${HELMET_ATTRIBUTE}="true" src="http://localhost/test2.js" type="text/javascript"></script>`
        ].join("");

        const stringifiedNoscriptTags = [
            `<noscript ${HELMET_ATTRIBUTE}="true" id="foo"><link rel="stylesheet" type="text/css" href="/style.css" /></noscript>`,
            `<noscript ${HELMET_ATTRIBUTE}="true" id="bar"><link rel="stylesheet" type="text/css" href="/style2.css" /></noscript>`
        ].join("");

        const stringifiedStyleTags = [
            `<style ${HELMET_ATTRIBUTE}="true" type="text/css">body {background-color: green;}</style>`,
            `<style ${HELMET_ATTRIBUTE}="true" type="text/css">p {font-size: 12px;}</style>`
        ].join("");

        before(() => {
            Helmet.canUseDOM = false;
        });

        it("provides initial values if no state is found", () => {
            let head = Helmet.rewind();
            head = Helmet.rewind();

            expect(head.meta).to.exist;
            expect(head.meta).to.respondTo("toString");

            expect(head.meta.toString()).to.equal("");
        });

        it("encodes special characters in title", () => {
            ReactDOM.render(
                <Helmet>
                    <title>{`Dangerous <script> include`}</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");

            expect(head.title.toString()).to.equal(stringifiedTitle);
        });

        it("opts out of string encoding", () => {
            ReactDOM.render(
                <Helmet encodeSpecialCharacters={false}>
                    <title>{"This is text and & and '."}</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();
            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");

            expect(head.title.toString()).to.equal(unEncodedStringifiedTitle);
        });

        it("renders title as React component", () => {
            ReactDOM.render(
                <Helmet>
                    <title>{`Dangerous <script> include`}</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toComponent");

            const titleComponent = head.title.toComponent();

            expect(titleComponent).to.be.an("array").that.has.length.of(1);

            titleComponent.forEach(title => {
                expect(title).to.be
                    .an("object")
                    .that.contains.property("type", "title");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {titleComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedTitle}</div>`);
        });

        it("renders title with itemprop name as React component", () => {
            ReactDOM.render(
                <Helmet>
                    <title itemProp="name">Title with Itemprop</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toComponent");

            const titleComponent = head.title.toComponent();

            expect(titleComponent).to.be.an("array").that.has.length.of(1);

            titleComponent.forEach(title => {
                expect(title).to.be
                    .an("object")
                    .that.contains.property("type", "title");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {titleComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedTitleWithItemprop}</div>`);
        });

        it("renders base tag as React component", () => {
            ReactDOM.render(
                <Helmet>
                    <base target="_blank" href="http://localhost/" />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.base).to.exist;
            expect(head.base).to.respondTo("toComponent");

            const baseComponent = head.base.toComponent();

            expect(baseComponent).to.be.an("array").that.has.length.of(1);

            baseComponent.forEach(base => {
                expect(base).to.be
                    .an("object")
                    .that.contains.property("type", "base");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {baseComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedBaseTag}</div>`);
        });

        it("renders meta tags as React components", () => {
            ReactDOM.render(
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta
                        name="description"
                        content={
                            "Test description & encoding of special characters like ' \" > < `"
                        }
                    />
                    <meta httpEquiv="content-type" content="text/html" />
                    <meta property="og:type" content="article" />
                    <meta itemProp="name" content="Test name itemprop" />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.meta).to.exist;
            expect(head.meta).to.respondTo("toComponent");

            const metaComponent = head.meta.toComponent();

            expect(metaComponent).to.be.an("array").that.has.length.of(5);

            metaComponent.forEach(meta => {
                expect(meta).to.be
                    .an("object")
                    .that.contains.property("type", "meta");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {metaComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedMetaTags}</div>`);
        });

        it("renders link tags as React components", () => {
            ReactDOM.render(
                <Helmet>
                    <link href="http://localhost/helmet" rel="canonical" />
                    <link
                        href="http://localhost/style.css"
                        rel="stylesheet"
                        type="text/css"
                    />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.link).to.exist;
            expect(head.link).to.respondTo("toComponent");

            const linkComponent = head.link.toComponent();

            expect(linkComponent).to.be.an("array").that.has.length.of(2);

            linkComponent.forEach(link => {
                expect(link).to.be
                    .an("object")
                    .that.contains.property("type", "link");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {linkComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedLinkTags}</div>`);
        });

        it("renders script tags as React components", () => {
            ReactDOM.render(
                <Helmet>
                    <script
                        src="http://localhost/test.js"
                        type="text/javascript"
                    />
                    <script
                        src="http://localhost/test2.js"
                        type="text/javascript"
                    />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.script).to.exist;
            expect(head.script).to.respondTo("toComponent");

            const scriptComponent = head.script.toComponent();

            expect(scriptComponent).to.be.an("array").that.has.length.of(2);

            scriptComponent.forEach(script => {
                expect(script).to.be
                    .an("object")
                    .that.contains.property("type", "script");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {scriptComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedScriptTags}</div>`);
        });

        it("renders noscript tags as React components", () => {
            ReactDOM.render(
                <Helmet>
                    <noscript id="foo">{`<link rel="stylesheet" type="text/css" href="/style.css" />`}</noscript>
                    <noscript id="bar">{`<link rel="stylesheet" type="text/css" href="/style2.css" />`}</noscript>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.noscript).to.exist;
            expect(head.noscript).to.respondTo("toComponent");

            const noscriptComponent = head.noscript.toComponent();

            expect(noscriptComponent).to.be.an("array").that.has.length.of(2);

            noscriptComponent.forEach(noscript => {
                expect(noscript).to.be
                    .an("object")
                    .that.contains.property("type", "noscript");
            });

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {noscriptComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedNoscriptTags}</div>`);
        });

        it("renders style tags as React components", () => {
            ReactDOM.render(
                <Helmet>
                    <style type="text/css">{`body {background-color: green;}`}</style>
                    <style type="text/css">{`p {font-size: 12px;}`}</style>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.style).to.exist;
            expect(head.style).to.respondTo("toComponent");

            const styleComponent = head.style.toComponent();

            expect(styleComponent).to.be.an("array").that.has.length.of(2);

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {styleComponent}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<div>${stringifiedStyleTags}</div>`);
        });

        it("renders title tag as string", () => {
            ReactDOM.render(
                <Helmet>
                    <title>{"Dangerous <script> include"}</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");

            expect(head.title.toString()).to.be
                .a("string")
                .that.equals(stringifiedTitle);
        });

        it("renders title and allows children containing expressions", done => {
            const someValue = "Some Great Title";

            ReactDOM.render(
                <Helmet>
                    <title>Title: {someValue}</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");

            requestAnimationFrame(() => {
                expect(head.title.toString()).to.be
                    .a("string")
                    .that.equals(stringifiedTitleWithTitleExpression);

                done();
            });
        });

        it("renders title with itemprop name as string", () => {
            ReactDOM.render(
                <Helmet>
                    <title itemProp="name">Title with Itemprop</title>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");

            const titleString = head.title.toString();
            expect(titleString).to.be
                .a("string")
                .that.equals(stringifiedTitleWithItemprop);
        });

        it("renders base tags as string", () => {
            ReactDOM.render(
                <Helmet>
                    <base target="_blank" href="http://localhost/" />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.base).to.exist;
            expect(head.base).to.respondTo("toString");

            expect(head.base.toString()).to.be
                .a("string")
                .that.equals(stringifiedBaseTag);
        });

        it("renders meta tags as string", () => {
            ReactDOM.render(
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta
                        name="description"
                        content="Test description &amp; encoding of special characters like &#x27; &quot; &gt; &lt; `"
                    />
                    <meta httpEquiv="content-type" content="text/html" />
                    <meta property="og:type" content="article" />
                    <meta itemProp="name" content="Test name itemprop" />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.meta).to.exist;
            expect(head.meta).to.respondTo("toString");

            expect(head.meta.toString()).to.be
                .a("string")
                .that.equals(stringifiedMetaTags);
        });

        it("renders link tags as string", () => {
            ReactDOM.render(
                <Helmet>
                    <link href="http://localhost/helmet" rel="canonical" />
                    <link
                        href="http://localhost/style.css"
                        rel="stylesheet"
                        type="text/css"
                    />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.link).to.exist;
            expect(head.link).to.respondTo("toString");

            expect(head.link.toString()).to.be
                .a("string")
                .that.equals(stringifiedLinkTags);
        });

        it("renders script tags as string", () => {
            ReactDOM.render(
                <Helmet>
                    <script
                        src="http://localhost/test.js"
                        type="text/javascript"
                    />
                    <script
                        src="http://localhost/test2.js"
                        type="text/javascript"
                    />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.script).to.exist;
            expect(head.script).to.respondTo("toString");

            expect(head.script.toString()).to.be
                .a("string")
                .that.equals(stringifiedScriptTags);
        });

        it("renders style tags as string", () => {
            ReactDOM.render(
                <Helmet>
                    <style type="text/css">{`body {background-color: green;}`}</style>
                    <style type="text/css">{`p {font-size: 12px;}`}</style>
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.style).to.exist;
            expect(head.style).to.respondTo("toString");

            expect(head.style.toString()).to.be
                .a("string")
                .that.equals(stringifiedStyleTags);
        });

        it("renders html attributes as component", () => {
            ReactDOM.render(
                <Helmet>
                    <html lang="ga" className="myClassName" />
                </Helmet>,
                container
            );

            const {htmlAttributes} = Helmet.rewind();
            const attrs = htmlAttributes.toComponent();

            expect(attrs).to.exist;

            const markup = ReactServer.renderToStaticMarkup(
                <html lang="en" {...attrs} />
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<html ${stringifiedHtmlAttributes}></html>`);
        });

        it("renders html attributes as string", () => {
            ReactDOM.render(
                <Helmet>
                    <html lang="ga" className="myClassName" />
                </Helmet>,
                container
            );

            const head = Helmet.rewind();

            expect(head.htmlAttributes).to.exist;
            expect(head.htmlAttributes).to.respondTo("toString");

            expect(head.htmlAttributes.toString()).to.be
                .a("string")
                .that.equals(stringifiedHtmlAttributes);
        });

        it("renders body attributes as component", () => {
            ReactDOM.render(
                <Helmet>
                    <body lang="ga" className="myClassName" />
                </Helmet>,
                container
            );

            const {bodyAttributes} = Helmet.rewind();
            const attrs = bodyAttributes.toComponent();

            expect(attrs).to.exist;

            const markup = ReactServer.renderToStaticMarkup(
                <body lang="en" {...attrs} />
            );

            expect(markup).to.be
                .a("string")
                .that.equals(`<body ${stringifiedBodyAttributes}></body>`);
        });

        it("renders body attributes as string", () => {
            ReactDOM.render(
                <Helmet>
                    <body lang="ga" className="myClassName" />
                </Helmet>,
                container
            );

            const body = Helmet.rewind();

            expect(body.bodyAttributes).to.exist;
            expect(body.bodyAttributes).to.respondTo("toString");

            expect(body.bodyAttributes.toString()).to.be
                .a("string")
                .that.equals(stringifiedBodyAttributes);
        });

        it("does not encode all characters with HTML character entity equivalents", () => {
            const chineseTitle = "膣膗 鍆錌雔";
            const stringifiedChineseTitle = `<title ${HELMET_ATTRIBUTE}="true">${chineseTitle}</title>`;

            ReactDOM.render(
                <div>
                    <Helmet>
                        <title>{chineseTitle}</title>
                    </Helmet>
                </div>,
                container
            );

            const head = Helmet.rewind();

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");

            expect(head.title.toString()).to.be
                .a("string")
                .that.equals(stringifiedChineseTitle);
        });

        it("rewind() provides a fallback object for empty Helmet state", () => {
            ReactDOM.render(<div />, container);

            const head = Helmet.rewind();

            expect(head.htmlAttributes).to.exist;
            expect(head.htmlAttributes).to.respondTo("toString");
            expect(head.htmlAttributes.toString()).to.equal("");
            expect(head.htmlAttributes).to.respondTo("toComponent");
            expect(head.htmlAttributes.toComponent()).to.be.an("object").that.is
                .empty;

            expect(head.title).to.exist;
            expect(head.title).to.respondTo("toString");
            expect(head.title.toString()).to.equal(
                `<title ${HELMET_ATTRIBUTE}="true"></title>`
            );
            expect(head.title).to.respondTo("toComponent");

            const markup = ReactServer.renderToStaticMarkup(
                <div>
                    {head.title.toComponent()}
                </div>
            );

            expect(markup).to.be
                .a("string")
                .that.equals(
                    `<div><title ${HELMET_ATTRIBUTE}="true"></title></div>`
                );

            expect(head.base).to.exist;
            expect(head.base).to.respondTo("toString");
            expect(head.base.toString()).to.equal("");
            expect(head.base).to.respondTo("toComponent");
            expect(head.base.toComponent()).to.be.an("array").that.is.empty;

            expect(head.meta).to.exist;
            expect(head.meta).to.respondTo("toString");
            expect(head.meta.toString()).to.equal("");
            expect(head.meta).to.respondTo("toComponent");
            expect(head.meta.toComponent()).to.be.an("array").that.is.empty;

            expect(head.link).to.exist;
            expect(head.link).to.respondTo("toString");
            expect(head.link.toString()).to.equal("");
            expect(head.link).to.respondTo("toComponent");
            expect(head.link.toComponent()).to.be.an("array").that.is.empty;

            expect(head.script).to.exist;
            expect(head.script).to.respondTo("toString");
            expect(head.script.toString()).to.equal("");
            expect(head.script).to.respondTo("toComponent");
            expect(head.script.toComponent()).to.be.an("array").that.is.empty;

            expect(head.noscript).to.exist;
            expect(head.noscript).to.respondTo("toString");
            expect(head.noscript.toString()).to.equal("");
            expect(head.noscript).to.respondTo("toComponent");
            expect(head.noscript.toComponent()).to.be.an("array").that.is.empty;

            expect(head.style).to.exist;
            expect(head.style).to.respondTo("toString");
            expect(head.style.toString()).to.equal("");
            expect(head.style).to.respondTo("toComponent");
            expect(head.style.toComponent()).to.be.an("array").that.is.empty;
        });

        it("does not render undefined attribute values", () => {
            ReactDOM.render(
                <Helmet>
                    <script src="foo.js" async={undefined} />
                </Helmet>,
                container
            );

            const {script} = Helmet.rewind();
            const stringifiedScriptTag = script.toString();

            expect(stringifiedScriptTag).to.be
                .a("string")
                .that.equals(
                    `<script ${HELMET_ATTRIBUTE}="true" src="foo.js" async></script>`
                );
        });

        context("renderStatic", () => {
            it("does html encode title", () => {
                ReactDOM.render(
                    <Helmet>
                        <title>{`Dangerous <script> include`}</title>
                    </Helmet>,
                    container
                );

                const head = Helmet.renderStatic();

                expect(head.title).to.exist;
                expect(head.title).to.respondTo("toString");

                expect(head.title.toString()).to.equal(stringifiedTitle);
            });

            it("renders title as React component", () => {
                ReactDOM.render(
                    <Helmet>
                        <title>{`Dangerous <script> include`}</title>
                    </Helmet>,
                    container
                );

                const head = Helmet.renderStatic();

                expect(head.title).to.exist;
                expect(head.title).to.respondTo("toComponent");

                const titleComponent = head.title.toComponent();

                expect(titleComponent).to.be.an("array").that.has.length.of(1);

                titleComponent.forEach(title => {
                    expect(title).to.be
                        .an("object")
                        .that.contains.property("type", "title");
                });

                const markup = ReactServer.renderToStaticMarkup(
                    <div>
                        {titleComponent}
                    </div>
                );

                expect(markup).to.be
                    .a("string")
                    .that.equals(`<div>${stringifiedTitle}</div>`);
            });
        });

        after(() => {
            Helmet.canUseDOM = true;
        });
    });

    describe("misc", () => {
        it("throws in rewind() when a DOM is present", () => {
            ReactDOM.render(
                <Helmet>
                    <title>Fancy title</title>
                </Helmet>,
                container
            );

            expect(Helmet.rewind).to.throw(
                "You may only call rewind() on the server. Call peek() to read the current state."
            );
        });

        it("lets you read current state in peek() whether or not a DOM is present", done => {
            ReactDOM.render(
                <Helmet>
                    <title>Fancy title</title>
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(Helmet.peek().title).to.be.equal("Fancy title");
                Helmet.canUseDOM = false;
                expect(Helmet.peek().title).to.be.equal("Fancy title");
                Helmet.canUseDOM = true;

                done();
            });
        });

        it("encodes special characters", done => {
            ReactDOM.render(
                <Helmet>
                    <meta
                        name="description"
                        content={'This is "quoted" text and & and \'.'}
                    />
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                const existingTags = headElement.querySelectorAll(
                    `meta[${HELMET_ATTRIBUTE}]`
                );
                const existingTag = existingTags[0];

                expect(existingTags).to.not.equal(undefined);

                expect(existingTags.length).to.be.equal(1);

                expect(existingTags).to.have.deep
                    .property("[0]")
                    .that.is.an.instanceof(Element);
                expect(existingTag).to.have.property("getAttribute");
                expect(existingTag.getAttribute("name")).to.equal(
                    "description"
                );
                expect(existingTag.getAttribute("content")).to.equal(
                    'This is "quoted" text and & and \'.'
                );
                expect(existingTag.outerHTML).to.equal(
                    `<meta name="description" content="This is &quot;quoted&quot; text and &amp; and '." ${HELMET_ATTRIBUTE}="true">`
                );

                done();
            });
        });

        it("does not change the DOM if it recevies identical props", done => {
            const spy = sinon.spy();
            ReactDOM.render(
                <Helmet onChangeClientState={spy}>
                    <meta name="description" content="Test description" />
                    <title>Test Title</title>
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                // Re-rendering will pass new props to an already mounted Helmet
                ReactDOM.render(
                    <Helmet onChangeClientState={spy}>
                        <meta name="description" content="Test description" />
                        <title>Test Title</title>
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(spy.callCount).to.equal(1);

                    done();
                });
            });
        });

        it("does not write the DOM if the client and server are identical", done => {
            headElement.innerHTML = `<script ${HELMET_ATTRIBUTE}="true" src="http://localhost/test.js" type="text/javascript" />`;

            const spy = sinon.spy();
            ReactDOM.render(
                <Helmet onChangeClientState={spy}>
                    <script
                        src="http://localhost/test.js"
                        type="text/javascript"
                    />
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(spy.called).to.equal(true);

                const [, addedTags, removedTags] = spy.getCall(0).args;

                expect(addedTags).to.be.empty;
                expect(removedTags).to.be.empty;

                done();
            });
        });

        it("only adds new tags and preserves tags when rendering additional Helmet instances", done => {
            const spy = sinon.spy();
            let addedTags;
            let removedTags;
            ReactDOM.render(
                <Helmet onChangeClientState={spy}>
                    <link
                        href="http://localhost/style.css"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <meta name="description" content="Test description" />
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(spy.called).to.equal(true);
                addedTags = spy.getCall(0).args[1];
                removedTags = spy.getCall(0).args[2];

                expect(addedTags).to.have.property("metaTags");
                expect(addedTags.metaTags).to.have.deep.property("[0]");
                expect(addedTags.metaTags[0].outerHTML).to.equal(
                    `<meta name="description" content="Test description" data-react-helmet="true">`
                );
                expect(addedTags).to.have.property("linkTags");
                expect(addedTags.linkTags).to.have.deep.property("[0]");
                expect(addedTags.linkTags[0].outerHTML).to.equal(
                    `<link href="http://localhost/style.css" rel="stylesheet" type="text/css" data-react-helmet="true">`
                );
                expect(removedTags).to.be.empty;

                // Re-rendering will pass new props to an already mounted Helmet
                ReactDOM.render(
                    <Helmet onChangeClientState={spy}>
                        <link
                            href="http://localhost/style.css"
                            rel="stylesheet"
                            type="text/css"
                        />
                        <link
                            href="http://localhost/style2.css"
                            rel="stylesheet"
                            type="text/css"
                        />
                        <meta name="description" content="New description" />
                    </Helmet>,
                    container
                );

                requestAnimationFrame(() => {
                    expect(spy.callCount).to.equal(2);
                    addedTags = spy.getCall(1).args[1];
                    removedTags = spy.getCall(1).args[2];

                    expect(addedTags).to.have.property("metaTags");
                    expect(addedTags.metaTags).to.have.deep.property("[0]");
                    expect(addedTags.metaTags[0].outerHTML).to.equal(
                        `<meta name="description" content="New description" data-react-helmet="true">`
                    );
                    expect(addedTags).to.have.property("linkTags");
                    expect(addedTags.linkTags).to.have.deep.property("[0]");
                    expect(addedTags.linkTags[0].outerHTML).to.equal(
                        `<link href="http://localhost/style2.css" rel="stylesheet" type="text/css" data-react-helmet="true">`
                    );
                    expect(removedTags).to.have.property("metaTags");
                    expect(removedTags.metaTags).to.have.deep.property("[0]");
                    expect(removedTags.metaTags[0].outerHTML).to.equal(
                        `<meta name="description" content="Test description" data-react-helmet="true">`
                    );
                    expect(removedTags).to.not.have.property("linkTags");

                    done();
                });
            });
        });

        it("does not accept nested Helmets", done => {
            const warn = sinon.stub(console, "warn");

            ReactDOM.render(
                <Helmet>
                    <title>Test Title</title>
                    <Helmet>
                        <title>Title you will never see</title>
                    </Helmet>
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(document.title).to.equal("Test Title");
                expect(warn.called).to.be.true;

                const [warning] = warn.getCall(0).args;
                expect(warning).to.equal(
                    "You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information."
                );

                warn.restore();

                done();
            });
        });

        it("warns on invalid elements", done => {
            const warn = sinon.stub(console, "warn");

            ReactDOM.render(
                <Helmet>
                    <title>Test Title</title>
                    <div>
                        <title>Title you will never see</title>
                    </div>
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(document.title).to.equal("Test Title");
                expect(warn.called).to.be.true;

                const [warning] = warn.getCall(0).args;
                expect(warning).to.equal(
                    "Only elements types base, body, head, html, link, meta, noscript, script, style, title are allowed. Helmet does not support rendering <div> elements. Refer to our API for more information."
                );

                warn.restore();
                done();
            });
        });

        it("warns on invalid self-closing elements", done => {
            const warn = sinon.stub(console, "warn");

            ReactDOM.render(
                <Helmet>
                    <title>Test Title</title>
                    <div customAttribute={true} />
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(document.title).to.equal("Test Title");
                expect(warn.called).to.be.true;

                const [warning] = warn.getCall(0).args;
                expect(warning).to.equal(
                    "Only elements types base, body, head, html, link, meta, noscript, script, style, title are allowed. Helmet does not support rendering <div> elements. Refer to our API for more information."
                );

                warn.restore();
                done();
            });
        });

        it("throws on invalid strings as children", () => {
            const renderInvalid = () =>
                ReactDOM.render(
                    <Helmet>
                        <title>Test Title</title>
                        <link
                            href="http://localhost/helmet"
                            rel="canonical"
                        >{`test`}</link>
                    </Helmet>,
                    container
                );

            expect(renderInvalid).to.throw(
                Error,
                "<link /> elements are self-closing and can not contain children. Refer to our API for more information."
            );
        });

        it("throws on invalid children", () => {
            const renderInvalid = () =>
                ReactDOM.render(
                    <Helmet>
                        <title>Test Title</title>
                        <script>
                            <title>Title you will never see</title>
                        </script>
                    </Helmet>,
                    container
                );

            expect(renderInvalid).to.throw(
                Error,
                "Helmet expects a string as a child of <script>. Did you forget to wrap your children in braces? ( <script>{``}</script> ) Refer to our API for more information."
            );
        });

        it("handles undefined children", done => {
            const charSet = undefined;

            ReactDOM.render(
                <Helmet>
                    {charSet && <meta charSet={charSet} />}
                    <title>Test Title</title>
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                expect(document.title).to.equal("Test Title");

                done();
            });
        });

        it("recognizes valid tags regardless of attribute ordering", done => {
            ReactDOM.render(
                <Helmet>
                    <meta content="Test Description" name="description" />
                </Helmet>,
                container
            );

            requestAnimationFrame(() => {
                const existingTags = headElement.querySelectorAll(
                    `meta[${HELMET_ATTRIBUTE}]`
                );
                const existingTag = existingTags[0];

                expect(existingTags).to.not.equal(undefined);

                expect(existingTags.length).to.be.equal(1);

                expect(existingTags).to.have.deep
                    .property("[0]")
                    .that.is.an.instanceof(Element);
                expect(existingTag).to.have.property("getAttribute");
                expect(existingTag.getAttribute("name")).to.equal(
                    "description"
                );
                expect(existingTag.getAttribute("content")).to.equal(
                    "Test Description"
                );
                expect(existingTag.outerHTML).to.equal(
                    `<meta content="Test Description" name="description" ${HELMET_ATTRIBUTE}="true">`
                );

                done();
            });
        });

        it("requestAnimationFrame works as expected", done => {
            requestAnimationFrame(cb => {
                expect(cb).to.exist;
                expect(cb).to.be.a("number");

                done();
            });
        });
    });
});
