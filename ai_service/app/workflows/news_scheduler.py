from apscheduler.schedulers.background import BackgroundScheduler

from app.services.article_pipeline import analyze_and_save


scheduler = BackgroundScheduler()


def run_news_pipeline():

    print("Running scheduled news collection...")

    try:

        result = analyze_and_save()

        print("Scheduler Result:", result)

    except Exception as e:

        print("Scheduler Error:", e)


def start_scheduler():

    scheduler.add_job(
        run_news_pipeline,
        trigger="interval",
        minutes=1,
        id="news_pipeline",
        replace_existing=True
    )

    scheduler.start()

    print("News Scheduler Started")