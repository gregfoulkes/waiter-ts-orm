SELECT "day"."id" AS "day_id", "day"."dayname" AS "day_dayname", "shift"."id" AS "shift_id", "shift"."waiterId" AS "shift_waiterId", "shift"."weekdayId" AS "shift_weekdayId", "waiter"."id" AS "waiter_id", "waiter"."username" AS "waiter_username", "waiter"."fullname" AS "waiter_fullname", "waiter"."position" AS "waiter_position" FROM "day" "day" LEFT JOIN "shift" "shift" ON "shift"."weekdayId"="day"."id"  LEFT JOIN "waiter" "waiter" ON "waiter"."id"="shift"."waiterId"