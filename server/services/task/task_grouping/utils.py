import datetime


def get_today() -> datetime.date:

    return datetime.date.today()



def get_tomorrow(
    today: datetime.date,
) -> datetime.date:

    return today + datetime.timedelta(days=1)



def get_this_week_end(
    today: datetime.date,
) -> datetime.date:

    return today + datetime.timedelta(
        days=7 - today.isoweekday()
    )



def get_next_week_start(
    today: datetime.date,
) -> datetime.date:

    tomorrow = get_tomorrow(today)

    days_until_monday = (
        7 - tomorrow.isoweekday()
    ) % 7


    if days_until_monday == 0:
        days_until_monday = 7


    return tomorrow + datetime.timedelta(
        days=days_until_monday
    )



def format_date(
    value: datetime.date,
) -> str:

    return (
        f"{value.strftime('%B')} "
        f"{value.day}, "
        f"{value.year}"
    )