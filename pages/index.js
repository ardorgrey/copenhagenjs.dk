import React from 'react'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import marked from 'marked'

export default class IndexRoutes extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      markdown: '',
      localtion: '',
      date: ''
    }
  }
  async fetchLatestPost() {
    const fm = await import('front-matter')
    const req = await fetch('/static/posts/2019-08-22-august-meetup.md')
    const data = await req.text()
    const content = fm.default(data)
    this.setState({
      loading: true,
      markdown: content.body,
      location: content.attributes.location,
      date: content.attributes.date
    })
  }
  componentDidMount() {
    this.fetchLatestPost()
  }
  render() {
    return (
      <Layout>
        <style jsx>{`
          .date {
            font-size: 1.5rem;
          }
          .description {
          }
          .description :global(h1) {
            margin: 5px 0;
          }
        `}</style>
        <header className="page-header master bg-grey" role="navigation">
          <Navigation />

          <img
            className="logo"
            src="/static/images/cphjs.png"
            alt="CopenhagenJS logo"
          />
          <h3>
            CopenhagenJS is a monthly meetup for people interested in JavaScript
            in Copenhagen.
          </h3>

          <a
            className="credits"
            href="http://www.flickr.com/photos/tenzer/8148224729/"
          >
            Photo by Jeppe Toustrup
          </a>
        </header>

        {!this.state.loading && (
          <section className="page">Fetching latest meetup..</section>
        )}
        {this.state.loading && (
          <section className="page">
            <div className="date">
              {this.state.date && this.state.date.toLocaleString('da-DK')}
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: marked(this.state.markdown)
              }}
            />
            <div className="next-meetup">
              <p>Read more and sign up for the next event here:</p>

              <a
                className="next-meetup__button"
                href="https://www.meetup.com/copenhagenjs/"
              >
                View meetup group
              </a>
            </div>
            {this.state.location && <Map location={this.state.location} />}
          </section>
        )}

        <section className="newsletter">
          <h3>Dont miss important news!</h3>

          <div className="social">
            <div>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcopenhagenjs%2F&tabs&width=300&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=167461780321599"
                width="300"
                height="214"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowtransparency="true"
              />
            </div>
            <div>
              <a
                href="https://twitter.com/copenhagenjs"
                className="twitter-follow-button"
                data-show-count="true"
                data-size="large"
              >
                Follow @copenhagenjs
              </a>
            </div>
          </div>

          <div className="newsletter__description">
            <p>
              Sign up for the CopenhagenJS newsletter and get notifications
              about upcoming events.
            </p>
          </div>
          <form
            action="//copenhagenjs.us11.list-manage.com/subscribe/post?u=e5f1b30e5ca3a2a397fa93a0d&amp;id=163c4118a6"
            method="post"
            target="_blank"
          >
            <input
              type="email"
              placeholder="mail@example.com"
              name="EMAIL"
              className="newsletter__email"
              required
            />
            <div style={{ position: 'absolute', left: '-5000px' }}>
              <input
                type="text"
                name="b_e5f1b30e5ca3a2a397fa93a0d_163c4118a6"
                tabIndex="-1"
              />
            </div>
            <input
              type="submit"
              value="Subscribe now!"
              name="subscribe"
              className="newsletter__subscribe"
            />
          </form>
        </section>
      </Layout>
    )
  }
}
